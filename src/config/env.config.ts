import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

export const ValidationSchema = Joi.object({
    PORT: Joi.number().required(),
    POSTGRES_URL: Joi.string().required(),
    NODE_ENV: Joi.string().default('dev'),
    JWT_SECRET: Joi.string().required(),
    AWS_BUCKET_NAME: Joi.string().required(),
    AWS_BUCKET_REGION: Joi.string().required(),
    AWS_ACCESS_KEY: Joi.string().required(),
    AWS_SECRET_ACCESS_KEY: Joi.string().required(),
});

export const Envs = () => ({
    environment: process.env.NODE_ENV || 'dev',
    port: parseInt( process.env.PORT || '3000', 10),
    db_url: process.env.POSTGRES_URL,
    jwt_secret: process.env.JWT_SECRET,
    aws_bucket_name: process.env.AWS_BUCKET_NAME,
    aws_bucket_region: process.env.AWS_BUCKET_REGION,
    aws_access_key: process.env.AWS_ACCESS_KEY,
    aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY
});

@Injectable()
export class EnvConfig {
    public readonly port: number;
    public readonly environment: string;
    public readonly dbUrl: string;
    public readonly jwt_secret: string;
    public readonly aws_bucket_name: string;
    public readonly aws_bucket_region: string;
    public readonly aws_access_key: string;
    public readonly aws_secret_access_key: string;

    constructor( private configService: ConfigService ){
        this.environment = this.configService.get<string>('environment', 'dev');
        this.port = this.configService.get<number>('port', 3000);
        this.dbUrl = this.configService.get<string>('db_url')!;
        this.jwt_secret = this.configService.get<string>('jwt_secret')!;
        this.aws_bucket_name = this.configService.get<string>('aws_bucket_name')!;
        this.aws_bucket_region = this.configService.get<string>('aws_bucket_region')!;
        this.aws_access_key = this.configService.get<string>('aws_access_key')!;
        this.aws_secret_access_key = this.configService.get<string>('aws_secret_access_key')!;
    }
};