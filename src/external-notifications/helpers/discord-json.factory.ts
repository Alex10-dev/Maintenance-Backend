
import { WebhookChannel } from "../enums/notification-types.enum";
import { createHistoricalJSON } from "./discord-json-templates.helper";

export function DiscordJSONFactory( channel: WebhookChannel, message: string ) {

    switch( channel ) {
        case WebhookChannel.HISTORICAL:
            return createHistoricalJSON({
                message: message,
                username: "Alexis Orozco",
                email: "alexisorozco@gmail.com",
                module: "Usuarios"
            });

    }
}