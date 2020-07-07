import { TodoItem } from './todo';

  let PrivateMethodsAndData = (function() {

    return {
      todos: [],

      getTodos() {
        return this.todos;
      },

      isCompletedABoolean(completed) {
        return typeof completed === 'boolean';
      },

      isValidMonth(month) {
        const validMonths = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', ''];

        return validMonths.includes(month);
      },

      isValidYear(year) {
      const yearRegex = /^[12][0-9]{3}$/;

      return year === '' || yearRegex.test(year);
      },

      initMonth(month) {
        const errorMessage = 'Invalid month must be an empty string or strings digits 1 through 12';

        if (this.isValidMonth(month)) {
          return month;
        } else {
          throw new TypeError(errorMessage);
        }
      },

      initTitleOrDescription(titleOrDescription) {
        const titleOrDescriptionRegex = /[0-9a-z]/i;
        const trimmedTitleOrDescription = titleOrDescription.trim();
        const errorMessage = 'Title or Description must have at least on alphanumeric character';

        if (titleOrDescriptionRegex.test(trimmedTitleOrDescription)) {
          return trimmedTitleOrDescription;
        } else {
          throw new TypeError(errorMessage);
        }
      },

      initYear(year) {
        const errorMessage = 'Invalid year must be an empty string or a valid 4 digit year';

        if (this.isValidYear(year)) {
          return year;
        } else {
          throw new TypeError(errorMessage);
        }
      }
    }
  })();

  let TodoList = (function() {
    let privateMethodsAndData = Object.create(PrivateMethodsAndData);

    function InnerTodoList(todoSet) {
      let id = 0;
      todoSet.forEach((todo) => {
        let todoData = {};
        todoData.title = privateMethodsAndData.initTitleOrDescription(todo.title);
        todoData.month = privateMethodsAndData.initMonth(todo.month);
        todoData.year = privateMethodsAndData.initYear(todo.year);
        todoData.description = privateMethodsAndData.initTitleOrDescription(todo.description);
        privateMethodsAndData.getTodos().push(new TodoItem(id, todoData));
        id += 1;
      });
    }


    InnerTodoList.prototype.addTodoItem = function (todoData) {
      let allIds = privateMethodsAndData.getTodos().map((todo) => todo.id);
      let maxId = Math.max(...allIds);
      let cleanData = {
        title: privateMethodsAndData.initTitleOrDescription(todoData.title),
        month: privateMethodsAndData.initMonth(todoData.month),
        year: privateMethodsAndData.initYear(todoData.year),
        description: privateMethodsAndData.initTitleOrDescription(todoData.description)
      }
      privateMethodsAndData.getTodos().push(new TodoItem(maxId + 1, cleanData));
    }

    InnerTodoList.prototype.deleteTodoItem = function(id) {
      let foundIndex = privateMethodsAndData.getTodos().findIndex((todo) => todo.id === id);
      return privateMethodsAndData.getTodos().splice(foundIndex, 1)[0];
    }

    InnerTodoList.prototype.findTodo = function (id) {
      let todos = privateMethodsAndData.getTodos();
      let foundTodo = todos.find((todo) => {
        return todo.id === id;
      });
      let todoData = {
        title: foundTodo.title,
        month: foundTodo.month,
        year: foundTodo.year,
        description: foundTodo.description
      };

      let todoItem = new TodoItem(foundTodo.id, todoData);
      todoItem.completed = foundTodo.completed;

      return todoItem;
    }

    InnerTodoList.prototype.getAllTodos = function() {
      let allTodos = privateMethodsAndData.getTodos();
      let todoArray = [];
      allTodos.forEach((todoItem) => {
        let todoData = {
          title: todoItem.title,
          month: todoItem.month,
          year: todoItem.year,
          description: todoItem.description
        }
        let copyOfTododItem = new TodoItem(todoItem.id, todoData);
        copyOfTododItem.completed = todoItem.completed;
        todoArray.push(copyOfTododItem);
      });

      return todoArray;
    }

    InnerTodoList.prototype.numberOfTodos = function () {
      return privateMethodsAndData.getTodos().length;
    }

    InnerTodoList.prototype.updateTodoItem = function(id, updates) {
      let todoItem = privateMethodsAndData.getTodos().find((todo) => todo.id === id);
      Object.keys(updates).forEach((property) => {
        if (todoItem.hasOwnProperty(property)) {
          if (property === 'title') {
            todoItem[property] = privateMethodsAndData.initTitleOrDescription(updates[property]);
          } else if (property === 'description') {
            todoItem[property] = privateMethodsAndData.initTitleOrDescription(updates[property]);
          } else if (property === 'month') {
            todoItem[property] = privateMethodsAndData.initMonth(updates[property]);
          } else if (property === 'year') {
            todoItem[property] = privateMethodsAndData.initYear(updates[property])
          } else {
            todoItem[property] = updates[property];
          }
        }
      });
    }

    return InnerTodoList;
  })();

export { TodoList };

