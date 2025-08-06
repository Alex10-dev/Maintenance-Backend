import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { RequiredRoles } from 'src/common/enums/required-roles';
import { getAuthUser } from 'src/common/decorators/get-auth-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateIssueUseCase } from './use-cases/create-issue.use-case';

@Controller('issues')
export class IssuesController {
  constructor(
    private readonly issuesService: IssuesService,
    private readonly createIssueUseCase: CreateIssueUseCase,
  ) {}

  @Post()
  @Auth(RequiredRoles.USER)
  create(
    @Body() createIssueDto: CreateIssueDto,
    @getAuthUser() user: UserEntity
  ) {
    return this.createIssueUseCase.execute(createIssueDto, user);
  }

  @Get()
  findAll() {
    return this.issuesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.issuesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIssueDto: UpdateIssueDto) {
    return this.issuesService.update(+id, updateIssueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.issuesService.remove(+id);
  }
}
