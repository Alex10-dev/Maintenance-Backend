import { Injectable } from '@nestjs/common';
import { DiscordNotifier } from './channels/discord.notifier';
import { NotificationSource, WebhookChannel } from './enums/notification-types.enum';
import { DiscordPayloadService } from './channels/discord-payload';
import { UserEntity } from 'src/users/entities/user.entity';
import { IssueEntity } from 'src/issues/entities/issue.entity';

@Injectable()
export class ExternalNotificationsService {

    constructor(
        private readonly discord: DiscordNotifier,
    ){}

    async notifyIssueActivity(issue: IssueEntity, user: UserEntity, title: string ) {

        const payload = DiscordPayloadService.createIssueRecord({
            issue,
            user,
            title,
            source: NotificationSource.ISSUES
        })
        return await this.discord.notify( payload, WebhookChannel.REPORTS );
    }
}
