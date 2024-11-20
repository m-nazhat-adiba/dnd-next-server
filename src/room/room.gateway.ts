import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import {
  ClientToServerEvents,
  Message,
  ServerToClientEvents,
} from 'src/shared/interfaces/room.interface';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RoomGateway {
  @WebSocketServer() server: Server = new Server<
    ServerToClientEvents,
    ClientToServerEvents
  >();
  private logger = new Logger('RoomGateway');

  @SubscribeMessage('chat')
  async handleEvent(@MessageBody() payload: Message): Promise<Message> {
    this.logger.log(payload);
    this.server.emit('chat', payload);
    return payload;
  }
}
