import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres.railway.internal',
      port: 5432,
      username: 'postgres',
      password: 'QRlPGbXOkEXfFJntiAvDNyeIubUXkoGT',
      database: 'railway',
      entities: [],
      synchronize: true
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
