import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { UserEntity } from 'src/users/entities/user.entity';

interface ConnectedClients {
    [id: string]: {
        socket: Socket,
        user: UserEntity,
    }
}

@Injectable()
export class NotificationService {

    private connectedClients: ConnectedClients = {}

    registerClient(client: Socket, user: UserEntity) {
        this.connectedClients[client.id] = {
            socket: client,
            user: user,
        };
    }

    removeClient(clientId: string) {
        delete this.connectedClients[clientId];
    }

    getConnectedClients(): [string, string][] {
        return Object.values( this.connectedClients ).map(
            (value) => [value.socket.id, value.user.name + ' ' + value.user.lastName]
        );
    }
}
