import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { NotificationService } from './notification.service';
import { Server, Socket } from 'socket.io';
import { ValidateUserTokenUseCase } from './use-cases/validate-user-token.use-case';

@WebSocketGateway({cors: true, namespace: '/'})
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer() websocketServer: Server;

  constructor(
    private readonly notificationService: NotificationService,
    private readonly validateUserTokenUseCase: ValidateUserTokenUseCase,
  ) {}
  
  async handleConnection(client: Socket, ...args: any[]) {
    // console.log(`Cliente conectado: ${client.id}`)
    // console.log(client.handshake.headers.authentication);
    try {
      const token: string = client.handshake.headers.authentication as string;
      const user = await this.validateUserTokenUseCase.execute(token);

      this.notificationService.registerClient( client, user );
      this.websocketServer.emit('clients-updated', this.notificationService.getConnectedClients());

    } catch( error ) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    // console.log(`Cliente desconectado: ${client.id}`)
    this.notificationService.removeClient( client.id );
    this.websocketServer.emit('clients-updated', this.notificationService.getConnectedClients());
  }

  @SubscribeMessage('client-test')
  onEventFromClient( client: Socket, payload: any ) {
    console.log({
      payload,
      clientId: client.id,
    });
  }
  
}