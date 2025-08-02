import { Injectable } from '@nestjs/common';
import { DiscordNotifier } from './channels/discord.notifier';
import { createHistoricalJSON } from './helpers/discord-json-templates.helper';
import { WebhookChannel } from './enums/notification-types.enum';

@Injectable()
export class ExternalNotificationsService {

    constructor(
        private readonly discord: DiscordNotifier,
    ){}

    async sendNotification( message: string, channel: WebhookChannel ): Promise<Boolean> {

        const body = createHistoricalJSON({
            message: message,
            username: "Alexis Orozco",
            email: "alexisorozco@gmail.com",
            module: "Usuarios"
        });
        return await this.discord.notify( body, channel );
    }
}
