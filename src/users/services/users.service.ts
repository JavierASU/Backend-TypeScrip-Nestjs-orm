import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dto/users.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
    if (!user) {
      throw new NotFoundException(`Usuario ${username} no encontrado`);
    }

    return user;
  }

  async createUser(user: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });
    if (userFound) {
      throw new HttpException('User already exist', HttpStatus.CONFLICT);
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }

  getUsers() {
    return this.userRepository.find();
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async deleteUser(id: number) {
    await this.getUser(id);
    return this.userRepository.delete({ id });
  }

  async updateUser(id: number, payload: UpdateUserDto) {
    const user = await this.getUser(id);
    this.userRepository.merge(user, payload);
    return this.userRepository.save(user);
  }
}
