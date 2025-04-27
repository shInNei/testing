import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      if (createUserDto.role && !Object.values(UserRole).includes(createUserDto.role)) {
        throw new BadRequestException('Invalid role provided.');
      }

      const user = await this.prisma.user.create({ data: createUserDto });

      return {
        message: 'User created successfully.',
        data: user,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Email already exists.');
      }
      throw new InternalServerErrorException('Failed to create user.');
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.user.findMany();
      return {
        message: 'List of users retrieved successfully.',
        data: users,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users.');
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found.`);
      }
      return {
        message: 'User retrieved successfully.',
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.role && !Object.values(UserRole).includes(updateUserDto.role)) {
        throw new BadRequestException('Invalid role provided.');
      }

      await this.findOne(id); 

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });

      return {
        message: 'User updated successfully.',
        data: updatedUser,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Email already exists.');
      }
      throw new InternalServerErrorException('Failed to update user.');
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id); 

      await this.prisma.user.delete({ where: { id } });

      return {
        message: 'User deleted successfully.',
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete user.');
    }
  }
}
