import { DiscordWebhookJSON } from "../interfaces/discord-types.interface";

export function createHistoricalJSON( data: {
    title?: string,
    message: string,
    username: string,
    email: string,
    module: string,
}): DiscordWebhookJSON {

    return {
        embeds: [
            {
                title: data.title ? data.title : "New action registered on app",
                description: data.message,
                color: 0xf5B027,
                fields: [
                    {
                        name: 'User',
                        value: data.username,
                        inline: true,
                    },
                    {
                        name: 'Email',
                        value: data.email,
                        inline: true,
                    }
                ],
                footer: {
                    text: data.module,
                },
                timestamp: new Date().toISOString(),
            }
        ]
    }
}