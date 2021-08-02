import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { AuthSignUpDto } from './dto/auth-signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authSignUpDto: AuthSignUpDto): Promise<void> {
    return this.usersRepository.createUser(authSignUpDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string; user: any }> {
    const { username, password } = authCredentialsDto;
    const userResponse = await this.usersRepository.findOne({ username });

    if (
      userResponse &&
      (await bcrypt.compare(password, userResponse.password))
    ) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);

      const user = {
        name: userResponse.name,
        username: userResponse.username,
        avatar_url: 'https://github.com/DaviReisVieira.png',
      };
      return { accessToken, user };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
