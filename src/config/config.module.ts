import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfig, Envs, ValidationSchema } from './env.config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Envs],
      validationSchema: ValidationSchema,
      isGlobal: true,
    }),

    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: ( configService: ConfigService ) => {
        // console.log('jwt secret', configService.get('jwt_secret'));
        return {
          secret: configService.get('jwt_secret'),
          signOptions: { expiresIn: '2h' }
        }
      },
    }),
  ],
  providers: [EnvConfig],
  exports: [EnvConfig, PassportModule, JwtModule],
})
export class ConfigAppModule {}