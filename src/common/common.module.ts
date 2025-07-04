import { Module } from '@nestjs/common';
import { BcryptAdapter } from './adapters/bcrypt.adapter';

@Module({
  providers: [ BcryptAdapter ],
  exports: [ BcryptAdapter ],
  imports: []
})
export class CommonModule {}