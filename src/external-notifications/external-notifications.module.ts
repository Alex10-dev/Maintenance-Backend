import { Module } from '@nestjs/common';
import { ExternalNotificationsService } from './external-notifications.service';
import { ConfigAppModule } from 'src/config/config.module';
import { DiscordNotifier } from './channels/discord.notifier';

@Module({
  controllers: [],
  providers: [ExternalNotificationsService, DiscordNotifier],
  imports: [ConfigAppModule],
  exports: [ExternalNotificationsService]
})
export class ExternalNotificationsModule {}
