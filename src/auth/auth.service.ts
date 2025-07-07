import { Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly prismaService: PrismaService,
  ){}

  async create(data: {
    email: string,
    password: string,
    userId: string,
  }) {
    return await this.prismaService.auth.create({
      data: {
        providerId: data.email,
        password: data.password,
        userId: data.userId,
      }
    });
  }

  findAll() {
    return `This action returns all auth`;
  }

  async findOne(email: string, type: string) {
    return await this.prismaService.auth.findFirst({
      where: {
        providerId: email,
        type: type,
      },
      include: {
        user: true,
      }
    });
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

}
