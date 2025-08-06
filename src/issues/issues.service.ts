import { Injectable } from '@nestjs/common';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IssuesService {

  constructor(
    private readonly prismaService: PrismaService,
  ){}

  async create(createdById: string, description: string, deviceType: string) {
    return await this.prismaService.issue.create({
      data: {
        description,
        deviceType,
        createdById
      },
      include: {
        issueFiles: {
          include: { file: true }
        },
        issueComments: {
          include: { comment: true }
        },
      }
    });
  }

  findAll() {
    return `This action returns all issues`;
  }

  findOne(id: number) {
    return `This action returns a #${id} issue`;
  }

  update(id: number, updateIssueDto: UpdateIssueDto) {
    return `This action updates a #${id} issue`;
  }

  remove(id: number) {
    return `This action removes a #${id} issue`;
  }
}
