import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RegisterWithCredentialsUseCase } from './use-cases/register-with-credentials.use-case';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,

    RegisterWithCredentialsUseCase,
  ],
  imports: [
    PrismaModule,
    UsersModule,
  ]
})
export class AuthModule {}
