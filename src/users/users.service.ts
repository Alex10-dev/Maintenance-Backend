import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    private readonly prismaService: PrismaService,
  ){}

  async create(data: Partial<User>): Promise<UserEntity> {
    const newUser = await this.prismaService.user.create({
      data: {
        name: data.name!,
        lastName: data.lastName!,
      }
    });

    return UserEntity.fromDB( newUser );
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    return await this.prismaService.user.findUnique({
      where: { id }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
