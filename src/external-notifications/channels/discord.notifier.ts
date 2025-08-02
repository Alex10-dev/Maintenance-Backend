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
            [WebhookChannel.USERS]: "",
            [WebhookChannel.REPORTS]: "",
            [WebhookChannel.TASKS]: "",
            [WebhookChannel.AWS]: "",
        };
    }

    async notify( message: DiscordWebhookJSON, channel: WebhookChannel ): Promise<Boolean> {

        /*const body: DiscordWebhookJSON = {
            content: message,
            username: 'Alexis Orozco',
            embeds: [
                {
                    title: "Nuevo mensaje",
                    description: message,
                    color: 0X00FF00,
                    timestamp: new Date().toISOString(),
                    fields: [
                        {
                            name: "Nombre",
                            value: "Alex Orozco",
                            inline: true,
                        },
                        {
                            name: "Correo",
                            value: "alexis@gmail.com",
                            inline: true,
                        }
                    ],
                    footer: {
                        text: "Pruebas de funcionamiento",
                        icon_url: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWx6OHN6NGhyZnhjbTc2aWlhYWExMXB5NHF1aHJ6M3lmcTYybng3aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3vQWJuTzIyLnlWfe/giphy.gif"
                    },
                    thumbnail: {
                        url: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2VhcmR2cmhkcjFpeGQ1M3M5bTc5NjVlYnkzZXQyaDRleTRjeWtpYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LUih9UIWXXb56/giphy.gif",
                    },
                    image: {
                        url: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmQwOGYxdW12c2l2cmt5eWhieG9jZHFjdzRuMTZ5d2N2YjYyNmdybCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ao53qNJHLQok4HxgEz/giphy.gif",
                    },
                    author: {
                        name: "Author name",
                        url: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2VhcmR2cmhkcjFpeGQ1M3M5bTc5NjVlYnkzZXQyaDRleTRjeWtpYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LUih9UIWXXb56/giphy.gif",
                        icon_url: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmQwOGYxdW12c2l2cmt5eWhieG9jZHFjdzRuMTZ5d2N2YjYyNmdybCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ao53qNJHLQok4HxgEz/giphy.gif"
                    }
                }
            ]
        }*/
        
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