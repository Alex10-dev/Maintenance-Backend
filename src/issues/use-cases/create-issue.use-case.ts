import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { IssuesService } from "../issues.service";
import { CreateIssueDto } from "../dto/create-issue.dto";
import { UserEntity } from "src/users/entities/user.entity";
import { ExternalNotificationsService } from "src/external-notifications/external-notifications.service";
import { IssueEntity } from "../entities/issue.entity";

@Injectable()
export class CreateIssueUseCase {
    constructor(
        private readonly issuesService: IssuesService,
        private readonly externalNotifications: ExternalNotificationsService
    ){}

    public async execute(createIssueDto: CreateIssueDto, user: UserEntity) {
        try{
            const newIssue = await this.issuesService.create(
                user.id,
                createIssueDto.description.trim(),
                createIssueDto.deviceType,
            );

            if( !newIssue ) throw new InternalServerErrorException('Cannot create the new issue');
            const issue = IssueEntity.fromDB(newIssue);

            await this.externalNotifications.notifyIssueActivity(
                issue,
                user,
                "New Issue Reported!!"
            );
            return issue;

        }catch( error ){
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }
    }
}