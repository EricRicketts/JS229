import { TodoItem } from './todo';

let TodoList = (function() {
  let PrivateMethodsAndData = (function() {
    let todos = [];

    function getTodos() {
      return todos;
    }

    function isCompletedABoolean(completed) {
      return typeof completed === 'boolean';
    }

    function isValidMonth(month) {
      const validMonths = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', ''];

      return validMonths.includes(month);
    }

    function isValidYear(year) {
      const yearRegex = /^[12][0-9]{3}$/;

      return year === '' || yearRegex.test(year);
    }

    function initMonth(month) {
      const errorMessage = 'Invalid month must be an empty string or strings digits 1 through 12';

      if (isValidMonth(month)) {
        return month;
      } else {
        throw new TypeError(errorMessage);
      }
    }

    function initTitleOrDescription(titleOrDescription) {
      const titleOrDescriptionRegex = /[0-9a-z]/i;
      const trimmedTitleOrDescription = titleOrDescription.trim();
      const errorMessage = 'Title or Description must have at least on alphanumeric character';

      if (titleOrDescriptionRegex.test(trimmedTitleOrDescription)) {
        return trimmedTitleOrDescription;
      } else {
        throw new TypeError(errorMessage);
      }
    }

    function initYear(year) {
      const errorMessage = 'Invalid year must be an empty string or a valid 4 digit year';

      if (isValidYear(year)) {
        return year;
      } else {
        throw new TypeError(errorMessage);
      }
    }

  })();

  function InnerTodoList(todoSet) {
    let id = 0;
    todoSet.forEach((todo) => {
      let todoData = {};
      todoData.title = initTitleOrDescription(todo.title);
      todoData.month = initMonth(todo.month);
      todoData.year = initYear(todo.year);
      todoData.description = initTitleOrDescription(todo.description);
      todos.push(new TodoItem(id, todoData));
      id += 1;
    });
  }

  InnerTodoList.prototype.addTodoItem = function(todoData) {
    let allIds = getTodos().map((todo) => todo.id);
    let maxId = Math.max(...allIds);
    getTodos().push(new TodoItem(maxId, todoData));
  }

  InnerTodoList.prototype.findTodo = function(id) {
    let todos = getTodos();
    let foundTodo = todos.find((todo) => {
      return todo.id === id;
    });
    let todoData = {
      title: foundTodo.title,
      month: foundTodo.month,
      year: foundTodo.year,
      description: foundTodo.description
    };

    return new TodoItem(foundTodo.id, todoData);
  }

  InnerTodoList.prototype.numberOfTodos = function() {
    return getTodos().length;
  }

  return InnerTodoList;
})();

export { TodoList };

