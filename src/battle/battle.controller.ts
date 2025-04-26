import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BattleService } from './battle.service';
import { CreateBattleDto } from './create-battle.dto';
import { UpdateBattleDto } from './update-battle.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('battles')
@Controller('api/battles')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post('create')
  create(@Body() dto: CreateBattleDto) {
    return this.battleService.create(dto);
  }

  @Get('all')
  findAll() {
    return this.battleService.findAll();
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.battleService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateBattleDto) {
    return this.battleService.update(id, dto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.battleService.remove(id);
  }
}
