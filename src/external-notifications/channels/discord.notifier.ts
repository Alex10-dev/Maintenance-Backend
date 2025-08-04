import { Injectable } from "@nestjs/common";
import { EnvConfig } from "src/config/env.config";
import { DiscordWebhookJSON } from "../interfaces/discord-types.interface";
import { WebhookChannel } from "../enums/notification-types.enum";

@Injectable()
export class DiscordNotifier {

    private readonly discordWebhooks: Record<WebhookChannel, string>;

    constructor( private readonly envConfig: EnvConfig ) {
        this.discordWebhooks = {
            [WebhookChannel.HISTORICAL]: envConfig.discord_webhook_historical,
            [WebhookChannel.USERS]: envConfig.discord_webhook_users,
            [WebhookChannel.REPORTS]: envConfig.discord_webhook_reports,
            [WebhookChannel.TASKS]: envConfig.discord_webhook_tasks,
            [WebhookChannel.AWS]: envConfig.discord_webhook_aws,
        };
    }

    async notify( message: DiscordWebhookJSON, channel: WebhookChannel ): Promise<Boolean> {
        
        const response = await fetch( this.discordWebhooks[channel], {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(message),
        });

        if( !response.ok ) {
            console.log('Error sending message to discord');
            return false;
        }

        return true;
    }
}