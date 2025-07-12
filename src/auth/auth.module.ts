import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RegisterWithCredentialsUseCase } from './use-cases/register-with-credentials.use-case';
import { UsersModule } from 'src/users/users.module';
import { CommonModule } from 'src/common/common.module';
import { LoginWithCredentialsUseCase } from './use-cases/login-with-credentials.use-case';
import { ConfigAppModule } from 'src/config/config.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CheckAuthStatusUseCase } from './use-cases/check-auth-status.use-case';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    RegisterWithCredentialsUseCase,
    LoginWithCredentialsUseCase,
    CheckAuthStatusUseCase,

    JwtStrategy,
  ],
  imports: [
    PrismaModule,
    UsersModule,
    CommonModule,
    ConfigAppModule,
    
  ],
  exports: [JwtStrategy]
})
export class AuthModule {}