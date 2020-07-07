import { TodoList } from "./todo_list";
import { TodoManger } from "./todo_manager";

function TodoApp(todoSet) {
  this.todoList = new TodoList(todoSet);
  this.todoManager = new TodoManger(this.todoList);
}
export { TodoApp };