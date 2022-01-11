import { Inject, Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
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

  public async handleConnection(client: Socket, ...args: any[]) {
    this.count += 1;
    this.logger.log(`Connected: ${this.count} connection`);
    // const games = await this.gamesService.getGames();
    // client.emit('GET_ALL_GAMES', games);
  }

  handleDisconnect(client: Socket) {
    this.count -= 1;
    this.logger.log(`Disconnected: ${this.count} connections`);
  }

  afterInit(server: Server) {
    this.logger.log('GamesGateway initialized');
  }

  @SubscribeMessage('ADD_NEW_GAME')
  async handleNewGame(
    // @ConnectedSocket() client: Socket,
    @MessageBody() data: Game,
  ): Promise<void> {
    await this.gamesService.createGame(data);
    // const games = await this.gamesService.getGames();

    // this.server.emit('REFRESH_GAMES', games);
  }

  @SubscribeMessage('DELETE_GAME')
  async handleDeleteGame(@MessageBody() data: string[]): Promise<void> {
    // data.forEach(async (id) => await this.gamesService.deleteGameById(id));
    // const games = await this.gamesService.getGames();
    // this.server.emit('REFRESH_GAMES', games);
  }

  @SubscribeMessage('CHANGE_GAME')
  async handleChangeGame(@MessageBody() data): Promise<void> {
    await this.gamesService.updateGame(data.id, data.game);
    // const games = await this.gamesService.getGames();

    // this.server.emit('REFRESH_GAMES', games);
  }
}
