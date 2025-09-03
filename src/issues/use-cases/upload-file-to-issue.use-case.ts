import { HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { UserEntity } from "src/users/entities/user.entity";
import { IssuesService } from "../issues.service";
import { UploadFileToAWSUseCase } from "src/files/use-cases/upload-file-to-aws.use-case";
import { FileUsage } from "src/common/enums/file-usage.enum";
import { RequiredRoles } from "src/common/enums/required-roles";
import { FindOneIssueUseCase } from "./find-one-issue.use-case";
import { ExternalNotificationsService } from "src/external-notifications/external-notifications.service";
import { FileEntity } from "src/files/entities/file.entity";
import { IssueFileEntity } from "../entities/issue-file.entity";

@Injectable()
export class UploadFileToIssueUseCase {

    constructor(
        private readonly issuesService: IssuesService,
        private readonly uploadFileToAwsUseCase: UploadFileToAWSUseCase,
        private readonly findOneIssueUseCase: FindOneIssueUseCase,

        private readonly externalNotifications: ExternalNotificationsService,
    ){}

    public async execute(file: Express.Multer.File, user: UserEntity, issueId: string) {
        try{
            const issue = await this.findOneIssueUseCase.execute(issueId);

            const userRoles = user.roles?.map((role) => role['name']) ?? [];
            if( userRoles.includes(RequiredRoles.USER) && issue.createdById != user.id ) {
                throw new UnauthorizedException(`User with id: ${user.id} can't update this record`);
            }

            const newFile = FileEntity.fromDB(
                await this.uploadFileToAwsUseCase.execute(file, FileUsage.REPORT, user)
            )
            const relation = await this.issuesService.relateFileToIssue(issueId, newFile.id);

            await this.externalNotifications.notifyIssueActivity(
                issue,
                user,
                "New file uploaded to the issue"
            );

            return IssueFileEntity.fromDB(relation);

        }catch( error ){
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }
    }

}