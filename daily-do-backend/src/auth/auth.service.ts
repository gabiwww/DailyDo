import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserCredentialsDto } from '../dto/user/user-credentials.dto';
import { BooleanResponseDto } from '../dto/common/boolean-response.dto';
import { JwtTokenDto } from '../dto/auth/jwt-token.dto';
import { UserPayload } from '../interface/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async register(userData: UserCredentialsDto): Promise<boolean> {
    await this.usersService.create(userData);
    return true;
  }

  async login(user: UserPayload): Promise<JwtTokenDto> {
    const payload = { id: user.id, username: user.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
