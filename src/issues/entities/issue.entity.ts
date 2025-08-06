import { Comment, File, Issue } from "generated/prisma";

export class IssueEntity {

    constructor(
        public id: string,
        public description: string,
        public status: string,
        public deviceType: string,
        public createdAt: Date,
        public updatedAt: Date,
        public isCompleted: Boolean,
        public createdById: string,
        public files: File[],
        public comments: Comment[],
        public qrToken?: string,
        public completedAt?: Date,
        public completedById?: string,
    ){}

    static fromDB(issue: Issue & { issueFiles?: { file: File }[], issueComments?: { comment: Comment }[] }): IssueEntity {
        const files = issue.issueFiles?.map(issueFile => issueFile.file) || [];
        const comments = issue.issueComments?.map(issueFile => issueFile.comment) || [];

        return new IssueEntity(
            issue.id,
            issue.description,
            issue.status,
            issue.deviceType,
            issue.createdAt,
            issue.updatedAt,
            issue.isCompleted,
            issue.createdById,
            files,
            comments,
            issue.qrToken ?? undefined,
            issue.completedAt ?? undefined,
            issue.completedById ?? undefined
        );
    }
}

