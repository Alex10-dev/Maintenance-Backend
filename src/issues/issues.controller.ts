import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, BadRequestException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { RequiredRoles } from 'src/common/enums/required-roles';
import { getAuthUser } from 'src/common/decorators/get-auth-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateIssueUseCase } from './use-cases/create-issue.use-case';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { DeleteOneIssueUseCase } from './use-cases/delete-one-issue.use-case';
import { UpdateIssueUseCase } from './use-cases/update-issue.use-case';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/files/helpers/fileFilter.helper';
import { UploadFileToAWSUseCase } from 'src/files/use-cases/upload-file-to-aws.use-case';
import { FileUsage } from 'src/common/enums/file-usage.enum';
import { UploadFileToIssueUseCase } from './use-cases/upload-file-to-issue.use-case';
import { FindOneIssueUseCase } from './use-cases/find-one-issue.use-case';

@Controller('issues')
export class IssuesController {
  constructor(
    private readonly issuesService: IssuesService,

    private readonly createIssueUseCase: CreateIssueUseCase,
    private readonly deleteOneIssueUseCase: DeleteOneIssueUseCase,
    private readonly updateIssueUseCase: UpdateIssueUseCase,
    private readonly findOneIssueUseCase: FindOneIssueUseCase,
    private readonly uploadFileToIssueUseCase: UploadFileToIssueUseCase,
  ) {}

  @Post()
  @Auth(RequiredRoles.USER, RequiredRoles.ADMIN)
  create(
    @Body() createIssueDto: CreateIssueDto,
    @getAuthUser() user: UserEntity
  ) {
    return this.createIssueUseCase.execute(createIssueDto, user);
  }

  @Post('/upload-file/:issueId')
  @Auth(RequiredRoles.USER, RequiredRoles.ADMIN)
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter('png', 'jpg', 'jpeg'),
  }))
  uploadFileToIssue(
    @UploadedFile() file: Express.Multer.File,
    @getAuthUser() user: UserEntity,
    @Param('issueId', new ParseUUIDPipe({
      exceptionFactory: () => new BadRequestException('issue id must be a valid UUID'),
    })) issueId: string
  ) {
    return this.uploadFileToIssueUseCase.execute(file, user, issueId);
  }

  @Get()
  @Auth(RequiredRoles.ADMIN)
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.issuesService.findAll( paginationDto );
  }

  @Get('/created-by-me')
  @Auth(RequiredRoles.USER)
  findAllCreatedByMe( 
    @Query() paginationDto: PaginationDto,
    @getAuthUser() user: UserEntity
  ) {
    return this.issuesService.findAllCreatedBy( paginationDto, user.id );
  }

  @Get('/created-by-user/:userId')
  @Auth(RequiredRoles.ADMIN, RequiredRoles.RESOLVER)
  findAllCreatedByUser( 
    @Query() paginationDto: PaginationDto,
    @Param('userId', new ParseUUIDPipe({
      exceptionFactory: () => new BadRequestException('user id must be a valid UUID'),
    })) userId: string
  ) {
    return this.issuesService.findAllCreatedBy( paginationDto, userId );
  }

  @Get(':id')
  @Auth(RequiredRoles.ADMIN, RequiredRoles.RESOLVER, RequiredRoles.USER)
  findOne(
    @Param('id', new ParseUUIDPipe({
      exceptionFactory: () => new BadRequestException('id must be a valid UUID'),
    })) id: string
  ) {
    return this.findOneIssueUseCase.execute(id);
  }

  @Patch(':id')
  @Auth(RequiredRoles.ADMIN, RequiredRoles.RESOLVER, RequiredRoles.USER)
  update(
    @getAuthUser() user: UserEntity,
    @Param('id') id: string, 
    @Body() updateIssueDto: UpdateIssueDto
  ) {
    // console.log(updateIssueDto);
    // return this.issuesService.update(+id, updateIssueDto);
    return this.updateIssueUseCase.execute(id, updateIssueDto, user)
  }

  @Delete(':id')
  @Auth(RequiredRoles.ADMIN)
  remove(
    @Param('id', new ParseUUIDPipe({
      exceptionFactory: () => new BadRequestException('id must be a valid UUID'),
    })) id: string
  ) {
    return this.deleteOneIssueUseCase.execute(id)
  }
}
