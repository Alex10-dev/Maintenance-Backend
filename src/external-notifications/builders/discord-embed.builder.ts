export class DiscordEmbed {

    public title?: string;
    public description?: string;
    public color?: number;
    public timestamp?: string;
    public fields?: Array<{
        name: string;
        value: string;
        inline?: Boolean;
    }>;
    public footer?: {
        text: string;
        icon_url?: string;
    };
    public thumbnail?: {
        url: string;
    };
    public image?: {
        url: string;
    };
    public author?: {
        name: string;
        url?: string;
        icon_url?: string;
    };
}

export class DiscordEmbedBuilder {

    private embed: DiscordEmbed;

    constructor(){
        this.embed = new DiscordEmbed();
    }

    public setTitle(title: string): DiscordEmbedBuilder {
        this.embed.title = title;
        return this;
    }

    public setDescription(description: string): DiscordEmbedBuilder {
        this.embed.description = description;
        return this;
    }

    public setColor(color: number): DiscordEmbedBuilder {
        this.embed.color = color;
        return this;
    }

    public setTimestamp(timestamp: string): DiscordEmbedBuilder {
        this.embed.timestamp = timestamp;
        return this;
    }

    public addField(name: string, value: string, inline?: Boolean): DiscordEmbedBuilder {
        if( !this.embed.fields ) this.embed.fields = [];
        
        this.embed.fields?.push({
            name,
            value,
            inline
        });
        return this;
    }

    public setFooter(text: string, icon_url?: string): DiscordEmbedBuilder {
        this.embed.footer = { text, icon_url }
        return this;
    }

    public setThumbnail(url: string): DiscordEmbedBuilder {
        this.embed.thumbnail = { url };
        return this;
    }

    public setImage(url: string): DiscordEmbedBuilder {
        this.embed.image = { url };
        return this;
    }

    public setAuthor(name: string, url?: string, icon_url?: string): DiscordEmbedBuilder {
        this.embed.author = { name, url, icon_url };
        return this;
    }

    public build(): DiscordEmbed {
        return this.embed;
    }
    
}