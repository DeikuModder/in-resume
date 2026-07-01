import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Resume, ResumeDocument } from './schemas/resume.schema';
import { UpsertResumeDto } from './dto/upsert-resume.dto';

const MAX_SLOTS = 6;

@Injectable()
export class ResumesService {
  constructor(
    @InjectModel(Resume.name) private resumeModel: Model<ResumeDocument>,
  ) {}

  async findAll(userId: string): Promise<ResumeDocument[]> {
    return this.resumeModel
      .find({ userId: new Types.ObjectId(userId) })
      .select('-__v')
      .exec();
  }

  async findBySlot(
    userId: string,
    slotName: string,
  ): Promise<ResumeDocument> {
    const resume = await this.resumeModel
      .findOne({ userId: new Types.ObjectId(userId), slotName })
      .select('-__v')
      .exec();

    if (!resume) {
      throw new NotFoundException(`Slot "${slotName}" not found`);
    }
    return resume;
  }

  async upsert(
    userId: string,
    dto: UpsertResumeDto,
  ): Promise<ResumeDocument> {
    const { slotName, ...data } = dto;

    const existing = await this.resumeModel.countDocuments({
      userId: new Types.ObjectId(userId),
    });

    const isNew = !(await this.resumeModel.exists({
      userId: new Types.ObjectId(userId),
      slotName,
    }));

    if (isNew && existing >= MAX_SLOTS) {
      throw new BadRequestException(
        `Maximum of ${MAX_SLOTS} resume slots reached`,
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

    return resume!;
  }

  async remove(userId: string, id: string): Promise<void> {
    const result = await this.resumeModel
      .findOneAndDelete({ _id: new Types.ObjectId(id), userId: new Types.ObjectId(userId) })
      .exec();

    if (!result) {
      throw new NotFoundException('Resume not found');
    }
  }
}
