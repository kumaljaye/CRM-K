import { Module } from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { ToDoController } from './to-do.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/to-do.entity';
import { TodoRepository } from './repo/to-do.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports : [TypeOrmModule.forFeature([Todo,TodoRepository]), UserModule],
  controllers: [ToDoController],
  providers: [ToDoService],
  exports: [ToDoService],
})
export class ToDoModule {}


