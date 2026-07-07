import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  ArrayMaxSize,
  MaxLength,
  IsNotIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  EducationDto,
  JobDto,
  ProjectDto,
  LanguageDto,
  CertificateDto,
  SoftSkillDto,
} from '../../resumes/dto/upsert-resume.dto';

const PREMIUM_TEMPLATE_IDS = ['creative', 'executive', 'tech'];

export class AnonymousPdfDto {
  @IsString() @IsOptional() @MaxLength(100) name?: string;
  @IsString() @IsOptional() @MaxLength(2000) pictureUrl?: string;
  @IsString() @IsOptional() @MaxLength(100) role?: string;
  @IsString() @IsOptional() @MaxLength(200) address?: string;
  @IsString() @IsOptional() @MaxLength(200) email?: string;
  @IsString() @IsOptional() @MaxLength(50) phone?: string;
  @IsString() @IsOptional() @MaxLength(50) secondaryPhone?: string;
  @IsString() @IsOptional() @MaxLength(100) gitHubUser?: string;
  @IsString() @IsOptional() @MaxLength(500) gitHubUrl?: string;
  @IsString() @IsOptional() @MaxLength(100) linkedinUser?: string;
  @IsString() @IsOptional() @MaxLength(500) linkedinUrl?: string;
  @IsString() @IsOptional() @MaxLength(3000) aboutMe?: string;

  @IsString()
  @IsOptional()
  @IsNotIn(PREMIUM_TEMPLATE_IDS, {
    message: 'Premium templates require a Premium subscription',
  })
  templateId?: string;

  @IsString() @IsOptional() accentColor?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  sectionOrder?: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  sidebarOrder?: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  hiddenSections?: string[];

  @IsArray()
  @IsOptional()
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => ProjectDto)
  projects?: ProjectDto[];

  @IsArray()
  @IsOptional()
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  education?: EducationDto[];

  @IsArray()
  @IsOptional()
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => JobDto)
  experience?: JobDto[];

  @IsArray()
  @IsOptional()
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => LanguageDto)
  languages?: LanguageDto[];

  @IsArray()
  @IsOptional()
  @ArrayMaxSize(60)
  @IsString({ each: true })
  skills?: string[];

  @IsArray()
  @IsOptional()
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => SoftSkillDto)
  softSkills?: SoftSkillDto[];

  @IsArray()
  @IsOptional()
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => CertificateDto)
  certificates?: CertificateDto[];
}
