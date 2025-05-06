import { Module } from '@nestjs/common';
import { PosthumousMessageController } from './posthumous-message.controller';
import { PosthumousMessageService } from './posthumous-message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PosthumousMessage } from './posthumous-mesage.entity';
import { PosthumousMessageRepository } from './posthumous-message.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PosthumousMessage])],
  controllers: [PosthumousMessageController],
  providers: [
    PosthumousMessageService,
    {
      provide: PosthumousMessageRepository,
      useFactory: (dataSource: DataSource) => {
        return new PosthumousMessageRepository(dataSource);
      },
      inject: [DataSource],
    },
  ],
  exports: [PosthumousMessageRepository],
})
export class PosthumousMessageModule {}
