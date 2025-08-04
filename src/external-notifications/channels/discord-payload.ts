import { UserEntity } from "src/users/entities/user.entity";
import { DiscordEmbedBuilder } from "../builders/discord-embed.builder";
import { DiscordPayload, DiscordPayloadBuilder } from "../builders/discord-payload.builder";
import { NotificationSource, WebhookChannel } from "../enums/notification-types.enum";

interface dataToPayload {
    title?: string,
    message?: string,
    user: UserEntity,
    module: string,
}

export class DiscordPayloadService {

    static createHistoricalRecord(data: dataToPayload): DiscordPayload {
        const embed = new DiscordEmbedBuilder()
            .setTitle(data.title ? data.title : "New action registered on app")
            .setDescription( data.message ? data.message : '' )
            .setColor(0xF5B027)
            .setFooter(data.module)
            .setTimestamp( new Date().toISOString() )
            .build();
        
        const payload = new DiscordPayloadBuilder()
            .setEmbed( embed )
            .build();
    
        return payload;
    }

    static createUsersRecord(data: dataToPayload): DiscordPayload {
        const embed = new DiscordEmbedBuilder()
            .setAuthor(`${data.user.name} ${data.user.lastName}`, undefined, "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDFpemZmNHRxMWQwbjhnY3Rqc2k3cDF4dDJ3MnUxemR0N3luOXd5byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Yun6k1ndbzayx21xgK/giphy.gif")
            .setTitle( data.title ? data.title : "New action registered on app New action registered on app" )
            .setDescription( data.message ? data.message : '' )
            .setFooter(data.module)
            .setTimestamp( new Date().toISOString() )
            .setColor(0X92C5FC)
            .build();
        
        const payload = new DiscordPayloadBuilder()
            .setEmbed( embed )
            .build();
    
        return payload;
    }

    static createAuthRecord(data: dataToPayload): DiscordPayload {
        const embed = new DiscordEmbedBuilder()
            .setTitle( data.title ? data.title : "New User Created" )
            .addField("ID", data.user.id)
            .addField("Name", data.user.name, true)
            .addField("Lastname", data.user.lastName, true)
            .addField("Gender", data.user.gender, true)
            .addField("Active", `${data.user.isActive}`, true)
            .addField("Created", data.user.createdAt.toISOString().split('T')[0], true)
            .addField("Roles", data.user.roles!.map( role => role["name"] ).join(', '), true)
            .setFooter(data.module)
            .setThumbnail("https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHR2MHVxNjBqdnRnN2xmYzBub3VqYzd5Nm5rajRlc3Eya2Zxbng3ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6ZtbrbSCe7AO4Pcc/giphy.gif")
            .setTimestamp( new Date().toISOString() )
            .setColor(0X92C5FC)
            .build();
        
        const payload = new DiscordPayloadBuilder()
            .setEmbed( embed )
            .build();
    
        return payload;
    }

    static createRecord(source: NotificationSource, data: dataToPayload): DiscordPayload {

        switch( source ) {
            case NotificationSource.REPORTS:
                return this.createHistoricalRecord(data);
            case NotificationSource.USERS:
                return this.createUsersRecord(data);
            case NotificationSource.AUTH:
                return this.createAuthRecord(data);
            default:
                return this.createHistoricalRecord(data);
        }
    }
}