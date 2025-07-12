import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterWithCredentialsUseCase } from './use-cases/register-with-credentials.use-case';
import { RegisterWithCredentialsDTO } from './dto/register-with-credentials.dto';
import { LoginWithCredentialsDTO } from './dto/login-with-credentials.dto';
import { LoginWithCredentialsUseCase } from './use-cases/login-with-credentials.use-case';
import { AuthGuard } from '@nestjs/passport';
import { getAuthUser } from 'src/common/decorators/get-auth-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { CheckAuthStatusUseCase } from './use-cases/check-auth-status.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    private readonly registerWithCredentialsUseCase: RegisterWithCredentialsUseCase,
    private readonly loginWithCredentialUseCase: LoginWithCredentialsUseCase,
    private readonly checkStatus: CheckAuthStatusUseCase,
  ) {}

  @Post('/credentials')
  register(@Body() registerDto: RegisterWithCredentialsDTO) {
    return this.registerWithCredentialsUseCase.execute(registerDto);
  }

  @Post('/login-credentials')
  loginWithCredentials(@Body() loginDto: LoginWithCredentialsDTO) {
    return this.loginWithCredentialUseCase.execute( loginDto );
  }

  @Post('/check-status')
  @UseGuards( AuthGuard('jwt') )
  checkAuthStatus(
    @getAuthUser() user: UserEntity
  ) {
    return this.checkStatus.execute(user);
  }

  @Get('/private')
  @UseGuards( AuthGuard('jwt') )
  findAll(
    @getAuthUser() user: UserEntity
  ) {
    return {
      user
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.authService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
