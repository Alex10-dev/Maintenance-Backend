import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, User } from 'generated/prisma';
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
          create: { roleId: roleId }
        }
      },
      include: {
        userRoles: {
          include: { role: true }
        }
      }
    });
  }

  async findAll() {
    return await this.prismaService.user.findMany({
      include: {
        userRoles: {
          include: { role: true }
        }
      }
    });
  }

  async findOne(id: string) {
    return await this.prismaService.user.findUnique({
      where: { id },
      include: {
        userRoles: {
          include: { role: true }
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

  async findOneWithRole(userId: string, roleId: string) {
    return await this.prismaService.userRole.findFirst({
      where: { userId, roleId },
      include: { role: true }
    });
  }

  async addRoleToUser(userId: string, roleId: string): Promise<Role> {
    const addedRole = await this.prismaService.userRole.create({
      data: {userId, roleId},
      include: { role: true }
    });
    return addedRole.role;
  }

  async removeRoleFromUser(userId: string, roleId: string): Promise<Role> {
    const removedRole = await this.prismaService.userRole.delete({
      where: {
        userId_roleId: {userId, roleId},
      },
      include: {role: true},
    });
    return removedRole.role;
  }
}
