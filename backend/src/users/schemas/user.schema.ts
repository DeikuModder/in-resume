import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: ['free', 'premium'], default: 'free' })
  subscriptionTier: 'free' | 'premium';

  @Prop({ type: String, index: true })
  stripeCustomerId?: string;

  @Prop({ type: String })
  stripeSubscriptionId?: string;

  @Prop({ type: String, enum: ['active', 'canceled', 'past_due', 'none'], default: 'none' })
  subscriptionStatus: 'active' | 'canceled' | 'past_due' | 'none';

  @Prop({ type: Date })
  subscriptionPeriodEnd?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
