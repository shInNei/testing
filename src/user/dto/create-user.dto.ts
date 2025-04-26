import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone_num?: string;

  @ApiProperty()
  lever: number;

  @ApiProperty()
  elo?: number;
}
