import { Injectable } from '@nestjs/common';
import { DiscordNotifier } from './channels/discord.notifier';
import { NotificationSource, WebhookChannel } from './enums/notification-types.enum';
import { DiscordPayloadService } from './channels/discord-payload';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class ExternalNotificationsService {

    constructor(
        private readonly discord: DiscordNotifier,
    ){}

    async sendNotification( user: UserEntity, channel: WebhookChannel, message: string, source: NotificationSource ){

        const payload = DiscordPayloadService.createRecord(source, {
            title: message,
            user,
            module: source
        });
        return await this.discord.notify( payload, channel );
    }
}
