import { Injectable } from '@nestjs/common';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

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

  async findAll( paginationDto: PaginationDto ) {

    const { limit = 10, offset = 0 } = paginationDto;

    return await this.prismaService.issue.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' }
    });
  }

  async findAllCreatedBy( paginationDto: PaginationDto, userId: string ) {

    const { limit = 10, offset = 0 } = paginationDto;

    return await this.prismaService.issue.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
      where: { createdById: userId }
    });
  }

  async findOne(id: string) {
    return await this.prismaService.issue.findUnique({
      where: { id },
      include: {
        issueFiles: {
          include: { file: true }
        },
      }
    });
  }

  async update(id: string, updateIssueDto: UpdateIssueDto) {
    return await this.prismaService.issue.update({
      where: { id },
      data: { ...updateIssueDto },
    })
  }

  async remove(id: string) {
    return await this.prismaService.issue.delete({
      where: { id }
    });
  }

  async relateFileToIssue(issueId: string, fileId: string) {
    return await this.prismaService.issueFile.create({
      data: {
        fileId,
        issueId,
      },
      include: {
        issue: true,
        file: {
          include: { uploadedBy: true }
        },
      }
    });
  }
}
