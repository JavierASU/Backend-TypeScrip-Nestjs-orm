import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import config from '../../config';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findUsername(username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      return user;
    }
    return null;
  }

  public generateToken(userId: number) {
    const payload: {
      userId: number;
    } = {
      userId,
    };
    const token = this.jwtService.sign(payload);

    return token;
  }

  validateToken(token: string) {
    try {
      const tokenWithoutBearer = token.replace('Bearer ', '');
      const verify = this.jwtService.verify(tokenWithoutBearer);
      return verify;
    } catch (e) {
      throw new UnauthorizedException('not allow');
    }
  }
}
