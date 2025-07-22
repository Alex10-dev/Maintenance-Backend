import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {

  constructor(
    private readonly prismaService: PrismaService,
  ){}

  async create(data: Partial<User>, roleId: string) {
    return await this.prismaService.user.create({
      data: {
        name: data.name!,
        lastName: data.lastName!,
        userRoles: {
          create: {
            roleId: roleId
          }
        }
      },
      include: {
        userRoles: {
          include: {
            role: true,
          }
        }
      }
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    return await this.prismaService.user.findUnique({
      where: { id },
      include: {
        userRoles: {
          include: {
            role: true,
          }
        }
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
