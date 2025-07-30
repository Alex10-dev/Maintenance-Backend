import { PutObjectCommand, PutObjectCommandOutput, S3Client } from '@aws-sdk/client-s3'
import { Injectable } from '@nestjs/common';
import { EnvConfig } from 'src/config/env.config';

@Injectable()
export class AwsS3Adapter {
    
    private readonly s3: S3Client;
    private readonly bucketName: string;

    constructor(private readonly envConfig: EnvConfig){
        this.bucketName = this.envConfig.aws_bucket_name;

        this.s3 = new S3Client({
            region: this.envConfig.aws_bucket_region,
            credentials: {
                accessKeyId: this.envConfig.aws_access_key,
                secretAccessKey: this.envConfig.aws_secret_access_key,
            }
        });
    }

    async uploadFile( key: string, buffer: Buffer, contentType: string): Promise<PutObjectCommandOutput> {
        return await this.s3.send(
            new PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                Body: buffer,
                ContentType: contentType,
            }),
        );
    }
}