import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterWithCredentialsUseCase } from './use-cases/register-with-credentials.use-case';
import { RegisterWithCredentialsDTO } from './dto/register-with-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    private readonly registerWithCredentialsUseCase: RegisterWithCredentialsUseCase,
  ) {}

  @Post('/credentials')
  register(@Body() registerDto: RegisterWithCredentialsDTO) {
    return this.registerWithCredentialsUseCase.execute(registerDto)
  }

  @Get()
  findAll() {
    return this.authService.findAll();
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
