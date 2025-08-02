import { Body, Controller, Post } from '@nestjs/common';
import { ExternalNotificationsService } from './external-notifications.service';
import { WebhookChannel } from './enums/notification-types.enum';

@Controller('external-notifications')
export class ExternalNotificationsController {
  constructor(
    private readonly externalNotificationsService: ExternalNotificationsService
  ) {}

  @Post()
  loginWithCredentials(@Body() body: { message: string}) {
    return this.externalNotificationsService.sendNotification(body.message, WebhookChannel.HISTORICAL);
  }

}
