import { Module } from '@nestjs/common';
import { PosthumousMessageController } from './posthumous-message.controller';
import { PosthumousMessageService } from './posthumous-message.service';

@Module({
  controllers: [PosthumousMessageController],
  providers: [PosthumousMessageService],
})
export class PosthumousMessageModule {}
