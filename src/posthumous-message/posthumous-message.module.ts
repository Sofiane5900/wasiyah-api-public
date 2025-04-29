import { Module } from '@nestjs/common';
import { PosthumousMessageController } from './posthumous-message.controller';
import { PosthumousMessageService } from './posthumous-message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PosthumousMessage } from './posthumous-mesage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PosthumousMessage])],
  controllers: [PosthumousMessageController],
  providers: [PosthumousMessageService],
})
export class PosthumousMessageModule {}
