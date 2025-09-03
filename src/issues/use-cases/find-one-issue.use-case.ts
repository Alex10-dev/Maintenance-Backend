import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { IssuesService } from "../issues.service";
import { IssueEntity } from "../entities/issue.entity";

@Injectable()
export class FindOneIssueUseCase {
    constructor(
        private readonly issuesService: IssuesService,
    ){}

    public async execute( issueId: string ): Promise<IssueEntity> {
        try{
            const issueExist = await this.issuesService.findOne( issueId );
            if( !issueExist ) 
                throw new BadRequestException(`Issue with id: ${issueId} doesn't exist`);

            const issue = IssueEntity.fromDB( issueExist );
            return issue;

        }catch( error ){
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }
    }
}