import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty({ description: 'Username' })
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  username: string;

  @ApiProperty({ description: 'Senha' })
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Password is too Weak',
  // })
  password: string;
}
