import { Module } from '@nestjs/common';
import { BattleService } from './battle.service';
import { BattleController } from './battle.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [BattleController],
  providers: [BattleService, PrismaService],
})
export class BattleModule {}
