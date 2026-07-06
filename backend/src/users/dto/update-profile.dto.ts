import { IsString, Matches } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @Matches(/^[a-z0-9]([a-z0-9-]{1,28}[a-z0-9])?$/, {
    message:
      'Username must be 3-30 chars, lowercase alphanumeric or hyphens, and cannot start or end with a hyphen',
  })
  username: string;
}
