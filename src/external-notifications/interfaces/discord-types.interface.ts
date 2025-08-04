
export interface DiscordEmbed {
    title?: string;
    description?: string;
    color?: number;
    timestamp?: string;
    fields?: Array<{
        name: string;
        value: string;
        inline?: Boolean;
    }>;
    footer?: {
        text: string;
        icon_url?: string;
    };
    thumbnail?: {
        url: string;
    };
    image?: {
        url: string;
    };
    author?: {
        name: string;
        url?: string;
        icon_url?: string;
    };
}

export interface DiscordWebhookJSON {
    content?: string;
    embeds?: DiscordEmbed[];
    username?: string;
    avatar_url?: string;
}