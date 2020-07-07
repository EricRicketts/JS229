function TodoManger(todoList) {
  this.todoList = todoList;
}

TodoManger.prototype.allTodos = function() {
  return this.todoList.getAllTodos();
}

TodoManger.prototype.allCompletedTodos = function() {
  let allTodos = this.allTodos();
  return allTodos.filter((todoItem) => todoItem.completed);
}

TodoManger.prototype.findCompletedByMonthAndYear = function(month, year) {
  let foundTodos = this.findByMonthAndYear(month, year);
  return foundTodos.filter((todoItem) => todoItem.completed);
}

TodoManger.prototype.findByMonthAndYear = function(month, year) {
  let allTodos = this.allTodos();
  return allTodos.filter((todoItem) => todoItem.isWithinMonthYear(month, year));
}
export { TodoManger };