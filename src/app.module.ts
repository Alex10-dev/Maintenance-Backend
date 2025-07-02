import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig, Envs, ValidationSchema } from './config/env.config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ Envs ],
      validationSchema: ValidationSchema,
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
  ],
  providers: [EnvConfig],
  exports: [EnvConfig]
})
export class AppModule {}
