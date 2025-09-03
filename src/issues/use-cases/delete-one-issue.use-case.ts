import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { IssuesService } from "../issues.service";
import { FindOneIssueUseCase } from "./find-one-issue.use-case";

@Injectable()
export class DeleteOneIssueUseCase {
    constructor(
        private readonly issuesService: IssuesService,
        private readonly findOneIssueUseCase: FindOneIssueUseCase
    ){}

    public async execute( issueId: string ) {
        try{
            const issue = await this.findOneIssueUseCase.execute( issueId );

            const deletedIssue = await this.issuesService.remove( issue.id );
            return deletedIssue;

        }catch( error ){
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }
    }
}