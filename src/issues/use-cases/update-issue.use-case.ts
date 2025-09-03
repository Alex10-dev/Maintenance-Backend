import { BadRequestException, HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { UpdateIssueDto } from "../dto/update-issue.dto";
import { UserEntity } from "src/users/entities/user.entity";
import { IssuesService } from "../issues.service";
import { FindOneIssueUseCase } from "./find-one-issue.use-case";
import { RequiredRoles } from "src/common/enums/required-roles";
import { IssueEntity } from "../entities/issue.entity";

@Injectable()
export class UpdateIssueUseCase {

    constructor(
        private readonly issuesService: IssuesService,
        private readonly findOneIssueUseCase: FindOneIssueUseCase,
    ){}

    public async execute( issueId: string, updateIssueDto: UpdateIssueDto, user: UserEntity): Promise<IssueEntity> {
        try{
            const issue = await this.findOneIssueUseCase.execute(issueId);
            const userRoles = user.roles?.map((role) => role['name']) ?? [];
            
            if( userRoles.includes(RequiredRoles.USER) && issue.createdById != user.id ) {
                throw new UnauthorizedException(`User with id: ${user.id} can't update this record`);
            }

            const updatedIssue = IssueEntity.fromDB(await this.issuesService.update(issueId, updateIssueDto))
            return updatedIssue;

        } catch( error ){
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }
    }
}