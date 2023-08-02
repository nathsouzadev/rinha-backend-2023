import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreatePersonDto {
  @ApiProperty({
    example: 'Deusa',
  })
  @IsNotEmpty({ message: 'Required field' })
  @MaxLength(32, {
    message: 'Is too long. Supports only 32 chars',
  })
  apelido: string;

  @ApiProperty({
    example: 'Ada Lovelace',
  })
  @IsNotEmpty({ message: 'Required field' })
  @MaxLength(100, {
    message: 'Is too long. Supports only 100 chars',
  })
  nome: string;

  @ApiProperty({
    example: '2000-12-01',
  })
  @IsDateString()
  @IsNotEmpty({ message: 'Required field' })
  nascimento: string;

  @ApiProperty({
    example: ['C#', 'Node', 'Oracle'],
  })
  @IsOptional()
  @MaxLength(32, {
    message: 'Is too long. Supports only 32 chars',
    each: true,
  })
  stack: string[];
}
