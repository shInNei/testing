import { ApiProperty } from '@nestjs/swagger';

export class CreateBattleDto {
  @ApiProperty()
  player1Id: string;

  @ApiProperty()
  player2Id: string;

  @ApiProperty({ required: false })
  winnerId?: string;
}
