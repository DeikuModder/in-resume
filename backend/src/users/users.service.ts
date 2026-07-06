import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as dns from 'dns';
import { ConfigService } from '@nestjs/config';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email: email.toLowerCase() }).exec();
  }

  async findById(userId: string): Promise<UserDocument | null> {
    return this.userModel
      .findById(new Types.ObjectId(userId))
      .select('-password')
      .exec();
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel
      .findOne({ username: username.toLowerCase() })
      .select('-password')
      .exec();
  }

  async findByCustomDomain(domain: string): Promise<UserDocument | null> {
    return this.userModel
      .findOne({ customDomain: domain.toLowerCase() })
      .select('-password')
      .exec();
  }

  async create(email: string, hashedPassword: string): Promise<UserDocument> {
    const user = new this.userModel({ email, password: hashedPassword });
    return user.save();
  }

  async updateUsername(
    userId: string,
    username: string,
  ): Promise<UserDocument> {
    const existing = await this.userModel.findOne({
      username: username.toLowerCase(),
      _id: { $ne: new Types.ObjectId(userId) },
    });
    if (existing) {
      throw new ConflictException('Username is already taken');
    }

    const user = await this.userModel
      .findByIdAndUpdate(
        new Types.ObjectId(userId),
        { username: username.toLowerCase() },
        { new: true, runValidators: true },
      )
      .select('-password')
      .exec();

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateCustomDomain(userId: string, domain: string): Promise<void> {
    const domainLower = domain.toLowerCase();
    const existing = await this.userModel.findOne({
      customDomain: domainLower,
      _id: { $ne: new Types.ObjectId(userId) },
    });
    if (existing) {
      throw new ConflictException('Domain is already registered');
    }

    const user = await this.userModel
      .findByIdAndUpdate(
        new Types.ObjectId(userId),
        { customDomain: domainLower },
        { new: true },
      )
      .exec();

    if (!user) throw new NotFoundException('User not found');
  }

  async verifyCustomDomain(
    userId: string,
  ): Promise<{
    verified: boolean;
    domain: string | null;
    expectedCname: string;
  }> {
    const appDomain = this.configService.get<string>(
      'APP_DOMAIN',
      'inresume.com',
    );
    const expectedCname = `custom.${appDomain}`;

    const user = await this.userModel
      .findById(new Types.ObjectId(userId))
      .select('customDomain')
      .exec();

    if (!user || !user.customDomain) {
      return { verified: false, domain: null, expectedCname };
    }

    try {
      const records = await dns.promises.resolveCname(user.customDomain);
      const verified = records.some((r) =>
        r.toLowerCase().includes(expectedCname),
      );
      return { verified, domain: user.customDomain, expectedCname };
    } catch {
      return { verified: false, domain: user.customDomain, expectedCname };
    }
  }
}
