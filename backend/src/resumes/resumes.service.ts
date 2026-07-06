import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Resume, ResumeDocument } from './schemas/resume.schema';
import { UpsertResumeDto } from './dto/upsert-resume.dto';
import { PublishResumeDto } from './dto/publish-resume.dto';
import { UsersService } from '../users/users.service';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

@Injectable()
export class ResumesService {
  constructor(
    @InjectModel(Resume.name) private resumeModel: Model<ResumeDocument>,
    private readonly usersService: UsersService,
  ) {}

  async findAll(userId: string): Promise<ResumeDocument[]> {
    return this.resumeModel
      .find({ userId: new Types.ObjectId(userId) })
      .select('-__v')
      .exec();
  }

  async findBySlot(userId: string, slotName: string): Promise<ResumeDocument> {
    const resume = await this.resumeModel
      .findOne({ userId: new Types.ObjectId(userId), slotName })
      .select('-__v')
      .exec();

    if (!resume) {
      throw new NotFoundException(`Slot "${slotName}" not found`);
    }
    return resume;
  }

  async upsert(userId: string, dto: UpsertResumeDto): Promise<ResumeDocument> {
    const { slotName, ...data } = dto;

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPremium = user.subscriptionTier === 'premium';
    const MAX_SLOTS = isPremium ? 6 : 2;

    if (!isPremium && dto.designIndex !== undefined && dto.designIndex > 0) {
      throw new ForbiddenException(
        'Free tier users can only use the default template design',
      );
    }

    if (!isPremium) {
      const slotNumber = parseInt(slotName.replace('slot', ''), 10);
      if (slotNumber > 2) {
        throw new ForbiddenException(
          'Please upgrade to premium to edit or save to this slot.',
        );
      }
    }

    const existingCount = await this.resumeModel.countDocuments({
      userId: new Types.ObjectId(userId),
    });

    const isNew = !(await this.resumeModel.exists({
      userId: new Types.ObjectId(userId),
      slotName,
    }));

    if (isNew && existingCount >= MAX_SLOTS) {
      throw new ForbiddenException(
        `Maximum of ${MAX_SLOTS} resume slots reached. Please upgrade to create more.`,
      );
    }

    const resume = await this.resumeModel
      .findOneAndUpdate(
        { userId: new Types.ObjectId(userId), slotName },
        { $set: { ...data, userId: new Types.ObjectId(userId), slotName } },
        { upsert: true, new: true, runValidators: true },
      )
      .select('-__v')
      .exec();

    return resume;
  }

  async remove(userId: string, id: string): Promise<void> {
    const result = await this.resumeModel
      .findOneAndDelete({
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId),
      })
      .exec();

    if (!result) {
      throw new NotFoundException('Resume not found');
    }
  }

  async publish(
    userId: string,
    id: string,
    dto: PublishResumeDto,
  ): Promise<ResumeDocument> {
    const userOid = new Types.ObjectId(userId);
    const resumeOid = new Types.ObjectId(id);

    const resume = await this.resumeModel
      .findOne({ _id: resumeOid, userId: userOid })
      .exec();

    if (!resume) throw new NotFoundException('Resume not found');

    const publicSlug =
      dto.slug ??
      (dto.isPublic
        ? slugify(resume.name || resume.slotName)
        : resume.publicSlug);

    // Enforce single isPrimary per user
    if (dto.isPrimary && dto.isPublic) {
      await this.resumeModel.updateMany(
        { userId: userOid, _id: { $ne: resumeOid } },
        { $set: { isPrimary: false } },
      );
    }

    // If turning off public, also clear isPrimary
    const isPrimary = dto.isPublic
      ? (dto.isPrimary ?? resume.isPrimary)
      : false;

    const updated = await this.resumeModel
      .findOneAndUpdate(
        { _id: resumeOid, userId: userOid },
        { $set: { isPublic: dto.isPublic, isPrimary, publicSlug } },
        { new: true, runValidators: true },
      )
      .select('-__v')
      .exec();

    return updated!;
  }

  async findPublicPrimary(userId: string): Promise<ResumeDocument> {
    const resume = await this.resumeModel
      .findOne({
        userId: new Types.ObjectId(userId),
        isPublic: true,
        isPrimary: true,
      })
      .select('-__v')
      .exec();

    if (!resume) throw new NotFoundException('No public primary resume found');
    return resume;
  }

  async findPublicBySlug(
    userId: string,
    slug: string,
  ): Promise<ResumeDocument> {
    const resume = await this.resumeModel
      .findOne({
        userId: new Types.ObjectId(userId),
        isPublic: true,
        publicSlug: slug.toLowerCase(),
      })
      .select('-__v')
      .exec();

    if (!resume) throw new NotFoundException('Resume not found');
    return resume;
  }
}
