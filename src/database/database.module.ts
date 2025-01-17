import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbName, host, port, user, password } = configService.database;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: dbName,
          entities: ['dist/**/*.entity.js'],
          migrations: ['src/database/migrations/*.js'],
          synchronize: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
