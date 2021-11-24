import * as faker from 'faker';
import { CreateUserDto } from '../../src/users/dto/create-user.dto';
import { CreateGameDto } from '../../src/games/dto/create-game.dto';

export const fakeOneUser = (): CreateUserDto => {
  return { email: faker.internet.email(), password: faker.internet.password() };
};

export const fakeManyUsers = (numUsers): CreateUserDto[] => {
  return Array.from({ length: numUsers }, fakeOneUser);
};

export const fakeOneGame = (): CreateGameDto => {
  return {
    name: faker.commerce.productName(),
    released: faker.datatype.number(),
    gameDev: faker.company.companyName(),
    description: faker.commerce.productDescription(),
    genre: faker.music.genre(),
    rating: faker.datatype.number(),
    ageRating: faker.datatype.number(),
    price: faker.commerce.price(),
    amount: faker.datatype.number(),
    image: faker.imageUrl.category(),
  };
};

export const fakeManyGames = (numGames): CreateGameDto[] => {
  return Array.from({ length: numGames }, fakeOneGame);
};
