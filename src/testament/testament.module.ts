import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Testament } from './testament.entity';
import { UserModule } from 'src/user/user.module';

Module({
  imports: [
    TypeOrmModule.forFeature([Testament]),
    forwardRef(() => UserModule),
  ],
  exports: [TypeOrmModule],
});
export class TestamentModule {}
