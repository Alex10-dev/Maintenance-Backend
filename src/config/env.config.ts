import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

export const ValidationSchema = Joi.object({
    PORT: Joi.number().required(),
    POSTGRES_URL: Joi.string().required(),
    NODE_ENV: Joi.string().default('dev'),
    JWT_SECRET: Joi.string().required(),
});

export const Envs = () => ({
    environment: process.env.NODE_ENV || 'dev',
    port: parseInt( process.env.PORT || '3000', 10),
    db_url: process.env.POSTGRES_URL,
    jwt_secret: process.env.JWT_SECRET,
});

@Injectable()
export class EnvConfig {
    public readonly port: number;
    public readonly environment: string;
    public readonly dbUrl: string;
    public readonly jwt_secret: string;

    constructor( private configService: ConfigService ){
        this.environment = this.configService.get<string>('environment', 'dev');
        this.port = this.configService.get<number>('port', 3000);
        this.dbUrl = this.configService.get<string>('db_url')!;
        this.jwt_secret = this.configService.get<string>('jwt_secret')!;
    }
};