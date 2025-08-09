import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsIP } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty({
    description: 'Date connected (ISO format)',
    example: '2025-01-15T10:30:00Z',
  })
  @IsDateString()
  dateTimeStamp: Date;

  @ApiProperty({
    description: 'IP address of the session',
    example: '192.168.1.10',
  })
  @IsIP()
  ipAdress: string;

  @ApiProperty({
    description: 'Browser the session was connected from',
    example: 'Chrome',
    required: false,
  })
  @IsOptional()
  @IsString()
  browser?: string;

  @ApiProperty({
    description: 'Operating system the session was connected from',
    example: 'Windows 10',
    required: false,
  })
  @IsOptional()
  @IsString()
  os?: string;

  @ApiProperty({
    description: 'Device type the session was connected from',
    example: 'Desktop',
    required: false,
  })
  @IsOptional()
  @IsString()
  deviceType?: string;

  @ApiProperty({
    description: 'Device model the session was connected from',
    example: 'MacBook Pro',
    required: false,
  })
  @IsOptional()
  @IsString()
  deviceModel?: string;

  @ApiProperty({
    description: 'User ID associated with this session',
    type: String,
  })
  @IsString()
  userId: string;
}
