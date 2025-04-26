import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateBattleDto } from './create-battle.dto';
import { UpdateBattleDto } from './update-battle.dto';

@Injectable()
export class BattleService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateBattleDto) {
    return this.prisma.battle.create({ data });
  }

  findAll() {
    return this.prisma.battle.findMany({
      include: {
        player1: true,
        player2: true,
        winner: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.battle.findUnique({
      where: { id },
      include: {
        player1: true,
        player2: true,
        winner: true,
      },
    });
  }

  update(id: string, data: UpdateBattleDto) {
    return this.prisma.battle.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.battle.delete({
      where: { id },
    });
  }
}
