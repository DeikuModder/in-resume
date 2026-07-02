import { Controller, Post, Get, Body, Req, Headers, UseGuards, HttpException, HttpStatus, RawBodyRequest } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; 

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  async createCheckout(@Req() req: any, @Body() body: CreateCheckoutDto) {
    return this.subscriptionsService.createCheckoutSession(req.user.userId, req.user.email, body.plan);
  }

  @UseGuards(JwtAuthGuard)
  @Post('portal')
  async createPortal(@Req() req: any) {
    try {
      return await this.subscriptionsService.createCustomerPortalSession(req.user.userId);
    } catch (err: any) {
      throw new HttpException(err.message || 'Failed to create portal session', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('webhook')
  async handleWebhook(@Req() req: any, @Headers('stripe-signature') signature: string) {
    if (!signature) {
      throw new HttpException('Missing stripe-signature header', HttpStatus.BAD_REQUEST);
    }
    return this.subscriptionsService.handleWebhookEvent(req, signature);
  }
}
