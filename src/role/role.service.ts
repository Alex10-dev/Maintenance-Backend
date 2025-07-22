import { Injectable } from '@nestjs/common';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {

  constructor(
    private readonly prismaService: PrismaService,
  ){}

  async create(name: string, description: string,) {
    return await this.prismaService.role.create({
      data: {
        name,
        description,
      }
    });
  }

  async findAll() {
    return await this.prismaService.role.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.role.findUnique({
      where: { id }
    });
  }

  async findOneByName(name: string) {
    return await this.prismaService.role.findFirst({
      where: { name }
    });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
