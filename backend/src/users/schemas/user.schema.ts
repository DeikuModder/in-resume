import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true,
    index: true,
    match: /^[a-z0-9]([a-z0-9-]{1,28}[a-z0-9])?$/,
  })
  username?: string;

  @Prop({ unique: true, sparse: true, lowercase: true, trim: true, index: true })
  customDomain?: string;

  @Prop({ default: false })
  isPremium: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
