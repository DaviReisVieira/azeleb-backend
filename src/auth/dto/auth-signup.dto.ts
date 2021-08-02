import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { AuthCredentialsDto } from './auth-credentials.dto';

export class AuthSignUpDto extends AuthCredentialsDto {
  @ApiProperty({ description: 'Name' })
  @IsString()
  name: string;
}
