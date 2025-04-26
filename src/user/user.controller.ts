import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('users')
@Controller('api/users') 
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('create') 
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get('all') 
  findAll() {
    return this.usersService.findAll();
  }

  @Get('detail/:id') 
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete('delete/:id') 
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
