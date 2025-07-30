import { Module } from '@nestjs/common';
import { BcryptAdapter } from './adapters/bcrypt.adapter';
import { JwtAdapter } from './adapters/jwt.adapter';
import { ConfigAppModule } from 'src/config/config.module';
import { AwsS3Adapter } from './adapters/aws-s3.adapter';

@Module({
  providers: [ BcryptAdapter, JwtAdapter, AwsS3Adapter ],
  exports: [ BcryptAdapter, JwtAdapter, AwsS3Adapter ],
  imports: [ ConfigAppModule ]
})
export class CommonModule {}