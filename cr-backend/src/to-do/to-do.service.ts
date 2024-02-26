/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { UpdateToDoDto } from './dto/update-to-do.dto';
import { TodoRepository } from './repo/to-do.repository';
import { Todo } from './entities/to-do.entity';
import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';

//ADD TODO BASED ON USER ID
//FIND ALL TODOS BASED ON USER ID (NOT COMPLETED)
//FIND ALL COMPLETED  TODOS BASED ON USER ID (COMPLETD)
//MARK TODO AS COMPLETED BASED ON TODO ID
//DELETE TODO BASED ON TODO ID

@Injectable()
export class ToDoService {
  constructor(@InjectRepository(Todo)
    private todoRepository: TodoRepository,
    private userService: UserService,
  ) {}

  async create(createToDoDto: CreateToDoDto, userId: number) {
    let todo: Todo = new Todo();
    todo.title = createToDoDto.title;
    todo.date = new Date().toLocaleString();
    todo.completed = false;
    todo.user = await this.userService.findUserById(userId);

    return this.todoRepository.save(todo);
  }

  findAllTodoByUserNotCompleted(userId: number) {
    // userid not completed
    return this.todoRepository.find({
      relations: ["user"],
      where: { user: { id: userId }, completed: false }});
  }

  findAllTodoByUserCompleted(userId: number) {
    // userid completed
    return this.todoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: true },
    });
  }



  update(todoId: number) {
    return this.todoRepository.update(todoId, { completed : true});
  }

  remove(todoId: number) {
    return this.todoRepository.delete(todoId);
  }
}
