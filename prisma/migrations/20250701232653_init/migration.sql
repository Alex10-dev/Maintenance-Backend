-- CreateTable
CREATE TABLE "Role" (
    "id" UUID NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "description" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "birthdate" TIMESTAMP NOT NULL,
    "gender" VARCHAR(10) NOT NULL DEFAULT 'UNSPECIFIED',
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "photo_id" UUID,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auth" (
    "id" UUID NOT NULL,
    "providerId" VARCHAR(255),
    "password" VARCHAR(128),
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "type" VARCHAR(20) NOT NULL DEFAULT 'CREDENTIALS',
    "user_id" UUID NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" UUID NOT NULL,
    "bucket_name" VARCHAR(255) NOT NULL,
    "key" VARCHAR(512) NOT NULL,
    "uploaded_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "original_file_name" TEXT,
    "file_size" REAL NOT NULL,
    "mime_type" VARCHAR(100) NOT NULL,
    "usage" VARCHAR(20) NOT NULL,
    "uploaded_by_id" UUID NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Issue" (
    "id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'REQUESTED',
    "device_type" VARCHAR(20) NOT NULL DEFAULT 'OTHER',
    "qr_token" UUID,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "completed_at" TIMESTAMP,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "created_by_id" UUID NOT NULL,
    "completed_by_id" UUID,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IssueFile" (
    "id" UUID NOT NULL,
    "issue_id" UUID NOT NULL,
    "file_id" UUID NOT NULL,

    CONSTRAINT "IssueFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "completed_at" TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "created_by_id" UUID NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAssignedToTask" (
    "id" UUID NOT NULL,
    "task_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "UserAssignedToTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskFile" (
    "id" UUID NOT NULL,
    "task_id" UUID NOT NULL,
    "file_id" UUID NOT NULL,

    CONSTRAINT "TaskFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "created_by_id" UUID NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentFile" (
    "id" UUID NOT NULL,
    "comment_id" UUID NOT NULL,
    "file_id" UUID NOT NULL,

    CONSTRAINT "CommentFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IssueComment" (
    "id" UUID NOT NULL,
    "comment_id" UUID NOT NULL,
    "issue_id" UUID NOT NULL,

    CONSTRAINT "IssueComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskComment" (
    "id" UUID NOT NULL,
    "comment_id" UUID NOT NULL,
    "task_id" UUID NOT NULL,

    CONSTRAINT "TaskComment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_photo_id_key" ON "User"("photo_id");

-- CreateIndex
CREATE INDEX "UserRole_user_id_idx" ON "UserRole"("user_id");

-- CreateIndex
CREATE INDEX "UserRole_role_id_idx" ON "UserRole"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_user_id_role_id_key" ON "UserRole"("user_id", "role_id");

-- CreateIndex
CREATE INDEX "Auth_user_id_idx" ON "Auth"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_type_providerId_key" ON "Auth"("type", "providerId");

-- CreateIndex
CREATE INDEX "File_uploaded_by_id_idx" ON "File"("uploaded_by_id");

-- CreateIndex
CREATE INDEX "Issue_created_by_id_idx" ON "Issue"("created_by_id");

-- CreateIndex
CREATE INDEX "IssueFile_issue_id_idx" ON "IssueFile"("issue_id");

-- CreateIndex
CREATE UNIQUE INDEX "IssueFile_issue_id_file_id_key" ON "IssueFile"("issue_id", "file_id");

-- CreateIndex
CREATE INDEX "Task_created_by_id_idx" ON "Task"("created_by_id");

-- CreateIndex
CREATE INDEX "UserAssignedToTask_task_id_user_id_idx" ON "UserAssignedToTask"("task_id", "user_id");

-- CreateIndex
CREATE INDEX "UserAssignedToTask_task_id_idx" ON "UserAssignedToTask"("task_id");

-- CreateIndex
CREATE INDEX "UserAssignedToTask_user_id_idx" ON "UserAssignedToTask"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserAssignedToTask_task_id_user_id_key" ON "UserAssignedToTask"("task_id", "user_id");

-- CreateIndex
CREATE INDEX "TaskFile_task_id_file_id_idx" ON "TaskFile"("task_id", "file_id");

-- CreateIndex
CREATE INDEX "TaskFile_task_id_idx" ON "TaskFile"("task_id");

-- CreateIndex
CREATE UNIQUE INDEX "TaskFile_task_id_file_id_key" ON "TaskFile"("task_id", "file_id");

-- CreateIndex
CREATE INDEX "Comment_created_by_id_idx" ON "Comment"("created_by_id");

-- CreateIndex
CREATE INDEX "CommentFile_comment_id_idx" ON "CommentFile"("comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "CommentFile_comment_id_file_id_key" ON "CommentFile"("comment_id", "file_id");

-- CreateIndex
CREATE INDEX "IssueComment_issue_id_idx" ON "IssueComment"("issue_id");

-- CreateIndex
CREATE UNIQUE INDEX "IssueComment_comment_id_issue_id_key" ON "IssueComment"("comment_id", "issue_id");

-- CreateIndex
CREATE INDEX "TaskComment_task_id_idx" ON "TaskComment"("task_id");

-- CreateIndex
CREATE UNIQUE INDEX "TaskComment_task_id_comment_id_key" ON "TaskComment"("task_id", "comment_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_uploaded_by_id_fkey" FOREIGN KEY ("uploaded_by_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_completed_by_id_fkey" FOREIGN KEY ("completed_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IssueFile" ADD CONSTRAINT "IssueFile_issue_id_fkey" FOREIGN KEY ("issue_id") REFERENCES "Issue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IssueFile" ADD CONSTRAINT "IssueFile_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAssignedToTask" ADD CONSTRAINT "UserAssignedToTask_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAssignedToTask" ADD CONSTRAINT "UserAssignedToTask_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskFile" ADD CONSTRAINT "TaskFile_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskFile" ADD CONSTRAINT "TaskFile_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentFile" ADD CONSTRAINT "CommentFile_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentFile" ADD CONSTRAINT "CommentFile_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IssueComment" ADD CONSTRAINT "IssueComment_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IssueComment" ADD CONSTRAINT "IssueComment_issue_id_fkey" FOREIGN KEY ("issue_id") REFERENCES "Issue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskComment" ADD CONSTRAINT "TaskComment_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskComment" ADD CONSTRAINT "TaskComment_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
