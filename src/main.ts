import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const host = '0.0.0.0';
  const port = process.env.PORT || 5000;
  app.listen(port, host, function () {
    console.log('Listening on port %d', port);
  });
}
bootstrap();
