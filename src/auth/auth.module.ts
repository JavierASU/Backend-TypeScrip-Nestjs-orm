import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigType } from '@nestjs/config';
import config from '../config';
import { JwtStrategy } from './strategies/jwt.strategy';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/services/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // PageOption,
      // Profile,
      // UserEntity,
      User,
    ]),
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [config.KEY],
      useFactory: async (configService: ConfigType<typeof config>) => ({
        secret: configService.jwtSecret,
        signOptions: {
          expiresIn: `${configService.jwtExpirationTime}s`,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService],
})
export class AuthModule {}
