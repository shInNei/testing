import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class CreateUserDto {
  @ApiProperty()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsOptional()
  phone_num?: string;

  @ApiProperty()
  lever: number;

  @ApiProperty()
  @IsOptional()
  elo?: number;

  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole; 
}
