import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email: email.toLowerCase() }).exec();
  }

  async create(email: string, hashedPassword: string): Promise<UserDocument> {
    const user = new this.userModel({ email, password: hashedPassword });
    return user.save();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async findByStripeCustomerId(stripeCustomerId: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ stripeCustomerId }).exec();
  }

  async updateStripeInfo(
    userId: string,
    data: {
      stripeCustomerId?: string;
      stripeSubscriptionId?: string;
      subscriptionTier?: 'free' | 'premium';
      subscriptionStatus?: 'active' | 'canceled' | 'past_due' | 'none';
      subscriptionPeriodEnd?: Date | null;
    },
  ): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(userId, { $set: data }, { new: true }).exec();
  }

  async downgradeToFree(userId: string): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          subscriptionTier: 'free',
          subscriptionStatus: 'canceled',
        },
      },
      { new: true },
    ).exec();
  }
}
