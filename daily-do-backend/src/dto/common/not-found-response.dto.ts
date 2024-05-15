import { ApiProperty } from '@nestjs/swagger';
import { HttpExceptionResponse } from '../../interface/auth.interface';

export class NotFoundResponseDto implements HttpExceptionResponse {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Not Found' })
  message: string;
}
