import { DiscordEmbed } from "./discord-embed.builder";

export class DiscordPayload {
    public content?: string;
    public embeds?: DiscordEmbed[];
    public username?: string;
    public avatar_url?: string;
}

export class DiscordPayloadBuilder {

    private payload: DiscordPayload;

    constructor(){
        this.payload = new DiscordPayload();
    }

    public setContent(text: string): DiscordPayloadBuilder {
        this.payload.content = text;
        return this;
    }

    public setEmbed(embed: DiscordEmbed): DiscordPayloadBuilder {
        if( !this.payload.embeds ) this.payload.embeds = [];
        
        this.payload.embeds?.push(embed);
        return this;
    }

    public setUsername(username: string): DiscordPayloadBuilder {
        this.payload.username = username;
        return this;
    }

    public setAvatarUrl(url: string): DiscordPayloadBuilder {
        this.payload.avatar_url = url;
        return this;
    }

    public build(): DiscordPayload {
        return this.payload;
    }
}
