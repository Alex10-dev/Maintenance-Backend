import { PartialType } from '@nestjs/mapped-types';
import { CreateIssueDto } from './create-issue.dto';
import { IsBoolean, IsDate, IsEnum, IsISO8601, IsOptional, IsUUID } from 'class-validator';
import { IssueStatus } from 'src/common/enums/issue-status.enum';

export class UpdateIssueDto extends PartialType(CreateIssueDto) {

    @IsOptional()
    @IsEnum(IssueStatus, {message: 'status is not a valid value'})
    status?: string;

    @IsOptional()
    @IsUUID()
    qrToken?: string;

    @IsOptional()
    @IsBoolean()
    isCompleted?: boolean;

    @IsOptional()
    @IsISO8601()
    completedAt?: string;

    @IsOptional()
    @IsUUID()
    completedById?: string;
}
