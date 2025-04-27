import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateBattleDto } from './create-battle.dto';
import { UpdateBattleDto } from './update-battle.dto';

@Injectable()
export class BattleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateBattleDto) {
    try {
      const battle = await this.prisma.battle.create({ data });
      return {
        message: 'Battle created successfully',
        data: battle,
      };
    } catch (error) {
      throw new BadRequestException('Failed to create battle');
    }
  }

  async findAll() {
    const battles = await this.prisma.battle.findMany({
      include: {
        player1: true,
        player2: true,
        winner: true,
      },
    });
    return {
      message: 'List of battles',
      data: battles,
    };
  }

  async findOne(id: string) {
    const battle = await this.prisma.battle.findUnique({
      where: { id },
      include: {
        player1: true,
        player2: true,
        winner: true,
      },
    });

    if (!battle) {
      throw new NotFoundException('Battle not found');
    }

    return {
      message: 'Battle details',
      data: battle,
    };
  }

  async update(id: string, data: UpdateBattleDto) {
    const battle = await this.prisma.battle.findUnique({ where: { id } });
    if (!battle) {
      throw new NotFoundException('Battle not found');
    }

    const updatedBattle = await this.prisma.battle.update({
      where: { id },
      data,
    });

    return {
      message: 'Battle updated successfully',
      data: updatedBattle,
    };
  }

  async remove(id: string) {
    const battle = await this.prisma.battle.findUnique({ where: { id } });
    if (!battle) {
      throw new NotFoundException('Battle not found');
    }

    await this.prisma.battle.delete({ where: { id } });

    return {
      message: 'Battle deleted successfully',
    };
  }
}
