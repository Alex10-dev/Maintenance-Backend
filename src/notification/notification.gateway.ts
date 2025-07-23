import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { NotificationService } from './notification.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({cors: true, namespace: '/'})
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer() websocketServer: Server;

  constructor(
    private readonly notificationService: NotificationService
  ) {}
  
  handleConnection(client: Socket, ...args: any[]) {
    // console.log(`Cliente conectado: ${client.id}`)
    // console.log(client.handshake.headers.authentication);
    this.notificationService.registerClient( client );
    
    this.websocketServer.emit('clients-updated', this.notificationService.getConnectedClients());
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