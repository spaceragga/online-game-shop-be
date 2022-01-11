import { Inject, Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { GamesService } from './games.service';
import { Game } from './schemas/game.schema';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GamesGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @Inject()
  private gamesService: GamesService;

  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('MessageGateway');
  private count = 0;

  private bookingOrders = [];

  public async handleConnection() {
    this.count += 1;
    this.logger.log(`Connected: ${this.count} connection`);
  }

  handleDisconnect() {
    this.count -= 1;
    this.logger.log(`Disconnected: ${this.count} connections`);
  }

  afterInit() {
    this.logger.log('GamesGateway initialized');
  }

  @SubscribeMessage('BOOKING_ORDERS')
  async handleBooking(@MessageBody() data: Game[]): Promise<boolean> {
    this.bookingOrders = data;
    const newValues = await this.gamesService.checkBookingOrders(
      data,
      'addBooking',
    );

    await Promise.all(
      newValues.map((item) =>
        this.gamesService.updateGame(item.id, item.gameUpdates),
      ),
    );

    setTimeout(async () => {
      if (this.bookingOrders.length) {
        await this.handleAbortBooking();
      }
    }, 900_000);

    return this.server.emit('BOOKING_SUCCESS');
  }

  @SubscribeMessage('ABORT_BOOKING_ORDERS')
  async handleAbortBooking(): Promise<boolean> {
    const newValues = await this.gamesService.checkBookingOrders(
      this.bookingOrders,
      'abortBooking',
    );

    await Promise.all(
      newValues.map((item) =>
        this.gamesService.updateGame(item.id, item.gameUpdates),
      ),
    );

    return this.server.emit('ABORT_BOOKING');
  }

  @SubscribeMessage('CONFIRM_BOOKING')
  handleConfirmBooking(): void {
    this.bookingOrders = [];
  }
}
