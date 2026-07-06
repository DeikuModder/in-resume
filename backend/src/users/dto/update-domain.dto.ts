import { IsString, Matches } from 'class-validator';

export class UpdateDomainDto {
  @IsString()
  @Matches(/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/, {
    message: 'Invalid domain format (e.g. resume.johndoe.com)',
  })
  domain: string;
}
