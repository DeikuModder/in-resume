import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { UsersService } from '../users/users.service';

@Injectable()
export class SubscriptionsService {
  private stripe: Stripe;
  private readonly logger = new Logger(SubscriptionsService.name);

  constructor(private readonly usersService: UsersService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2026-06-24.dahlia',
    });
  }

  async createCheckoutSession(userId: string, email: string, plan: 'monthly' | 'yearly') {
    const user = await this.usersService.findById(userId);
    let customerId = user?.stripeCustomerId;

    if (!customerId) {
      const customer = await this.stripe.customers.create({ email });
      customerId = customer.id;
      if (user) {
        await this.usersService.updateStripeInfo(userId, { stripeCustomerId: customerId });
      }
    }

    const priceId = plan === 'monthly' ? process.env.STRIPE_PRICE_MONTHLY : process.env.STRIPE_PRICE_YEARLY;

    const session = await this.stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId as string,
          quantity: 1,
        },
      ],
      success_url: process.env.CLIENT_SUCCESS_URL as string,
      cancel_url: process.env.CLIENT_CANCEL_URL as string,
      client_reference_id: userId,
    });

    return { url: session.url };
  }

  async createCustomerPortalSession(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.stripeCustomerId) {
      throw new Error('User has no Stripe customer associated');
    }
    const session = await this.stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: process.env.FRONTEND_URL as string,
    });

    return { url: session.url };
  }

  async handleWebhookEvent(req: any, signature: string) {
    let event: Stripe.Event;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

    try {
      if (!req.rawBody) {
        throw new Error('Raw body missing');
      }
      event = this.stripe.webhooks.constructEvent(req.rawBody, signature, webhookSecret);
    } catch (err: any) {
      this.logger.error(`Webhook signature verification failed: ${err.message}`);
      throw err;
    }

    try {
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as any;
          if (session.client_reference_id) {
            await this.usersService.updateStripeInfo(session.client_reference_id, {
              stripeSubscriptionId: session.subscription,
              subscriptionTier: 'premium',
              subscriptionStatus: 'active',
            });
          }
          break;
        }
        case 'invoice.payment_succeeded': {
          const invoice = event.data.object as any;
          const subscription = await this.stripe.subscriptions.retrieve(invoice.subscription) as any;
          const user = await this.usersService.findByStripeCustomerId(invoice.customer);
          if (user) {
            await this.usersService.updateStripeInfo(user.id, {
              subscriptionPeriodEnd: new Date(subscription.current_period_end * 1000),
            });
          }
          break;
        }
        case 'customer.subscription.updated': {
          const subscription = event.data.object as any;
          const user = await this.usersService.findByStripeCustomerId(subscription.customer);
          if (user) {
            const status = subscription.status;
            let tier: 'free' | 'premium' = user.subscriptionTier;
            let statusMapped: 'active' | 'canceled' | 'past_due' | 'none' = 'none';
            if (status === 'active' || status === 'trialing') {
              statusMapped = 'active';
              tier = 'premium';
            } else if (status === 'canceled') {
              statusMapped = 'canceled';
              tier = 'free';
            } else if (status === 'past_due' || status === 'unpaid') {
              statusMapped = 'past_due';
            }

            await this.usersService.updateStripeInfo(user.id, {
              subscriptionStatus: statusMapped,
              subscriptionTier: tier,
              subscriptionPeriodEnd: new Date(subscription.current_period_end * 1000),
            });
          }
          break;
        }
        case 'customer.subscription.deleted': {
          const subscription = event.data.object as any;
          const user = await this.usersService.findByStripeCustomerId(subscription.customer);
          if (user) {
            await this.usersService.downgradeToFree(user.id);
          }
          break;
        }
        case 'invoice.payment_failed': {
          const invoice = event.data.object as any;
          const user = await this.usersService.findByStripeCustomerId(invoice.customer);
          if (user) {
            await this.usersService.updateStripeInfo(user.id, {
              subscriptionStatus: 'past_due',
            });
          }
          break;
        }
      }
    } catch (err: any) {
      this.logger.error(`Error processing webhook event: ${err.message}`);
      throw err;
    }

    return { received: true };
  }
}
