import { Module } from '@nestjs/common';
import { BcryptAdapter } from './adapters/bcrypt.adapter';
import { JwtAdapter } from './adapters/jwt.adapter';
import { ConfigAppModule } from 'src/config/config.module';

@Module({
  providers: [ BcryptAdapter, JwtAdapter ],
  exports: [ BcryptAdapter, JwtAdapter ],
  imports: [ ConfigAppModule ]
})
export class CommonModule {}