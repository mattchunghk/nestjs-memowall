import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server;
  @SubscribeMessage('message')
  handleMessage(): void {
    this.server.emit('message');
  }
}
