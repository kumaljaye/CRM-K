import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { UpdateToDoDto } from './dto/update-to-do.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('todo')
@ApiTags("Todo")
@ApiSecurity("JWT-auth")
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}

  @Post(":userId")
create(@Body(ValidationPipe) createTodoDto: CreateToDoDto , @Param("userId") userId : number) {
  return this.toDoService.create(createTodoDto , Number(userId) );
}


  @Get("/findAllNotCompleted/:userId")
  findAllTodoByUserIdNotCompleted(@Param("userId") userId : number) {
    return this.toDoService.findAllTodoByUserNotCompleted(Number(userId)) ;
  }

  @Get("/findAllCompleted/:userId")
  findAllTodoByUserIdCompleted(@Param("userId") userId : number) {
    return this.toDoService.findAllTodoByUserCompleted(Number(userId)) ;
  }



  @Patch(':id')
  update(@Param('id') id: number) {
    return this.toDoService.update(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toDoService.remove(Number(id));
  }
}
