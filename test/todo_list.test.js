import { TodoList } from "../code/todo_list";

describe('TodoList', function () {
  let todoData1, todoData2, todoData3, todoData4, todoSet, todoList, expected, results;
  beforeAll(() => {
    todoData1 = {
      title: 'Buy Milk',
      month: '1',
      year: '2017',
      description: 'Milk for baby',
    };

    todoData2 = {
      title: 'Buy Apples',
      month: '',
      year: '2017',
      description: 'An apple a day keeps the doctor away',
    };

    todoData3 = {
      title: 'Buy chocolate',
      month: '1',
      year: '',
      description: 'For the cheat day',
    };

    todoData4 = {
      title: 'Buy Veggies',
      month: '',
      year: '',
      description: 'For the daily fiber needs',
    };

    todoSet = [todoData1, todoData2, todoData3, todoData4];
    todoList = new TodoList(todoSet);
  });

  describe('Operations on valid data', function () {
    let foundTodo, allTodos;
    it('should return a todo list object with 4 todo items', function () {
      expect(todoList.numberOfTodos()).toBe(4);
    });

    it('returns a todo Object based on the id property', function () {
      foundTodo = todoList.findTodo(2);
      results = {
        title: foundTodo.title,
        month: foundTodo.month,
        year: foundTodo.year,
        description: foundTodo.description
      }
      expect(results).toEqual(todoData3);
    });

    it('changing a found todo item does not alter the collection', function () {
      foundTodo = todoList.findTodo(2);
      foundTodo.completed = true;
      results = {
        completed: foundTodo.completed,
        title: foundTodo.title,
        month: foundTodo.month,
        year: foundTodo.year,
        description: foundTodo.description
      }
      expected = {
        completed: true,
        title: 'Buy chocolate',
        month: '1',
        year: '',
        description: 'For the cheat day',
      }
      expect(results).toEqual(expected);
      expected = {
        completed: false,
        title: 'Buy chocolate',
        month: '1',
        year: '',
        description: 'For the cheat day',
      }
      foundTodo = todoList.findTodo(2);
      results = {
        completed: foundTodo.completed,
        title: foundTodo.title,
        month: foundTodo.month,
        year: foundTodo.year,
        description: foundTodo.description
      }
      expect(results).toEqual(expected);
    });

    it('should add a new todo item', function () {
      let todoData5 = {
        title: 'Buy novel',
        month: '4',
        year: '2018',
        description: 'Present for wife'
      }
      todoList.addTodoItem(todoData5);
      expect(todoList.numberOfTodos()).toBe(5);
    });

    it('should remove a todo item', function () {
      let removedTodo = todoList.deleteTodoItem(2);
      expect(todoList.numberOfTodos()).toBe(4);
      results = {
        title: removedTodo.title,
        month: removedTodo.month,
        year: removedTodo.year,
        description: removedTodo.description
      };
      expected = {
        title: 'Buy chocolate',
        month: '1',
        year: '',
        description: 'For the cheat day',
      };
      expect(results).toEqual(expected);
    });

    it('should update an todo item', function () {
      foundTodo = todoList.findTodo(4);
      expected = {
        completed: false,
        title: 'Buy novel',
        month: '4',
        year: '2018',
        description: 'Present for wife'
      }
      results = {
        completed: foundTodo.completed,
        title: foundTodo.title,
        month: foundTodo.month,
        year: foundTodo.year,
        description: foundTodo.description
      }
      expect(results).toEqual(expected);
      let updates = { completed: true, title: 'Foo Bar', description: 'Wife is mad', qux: 'quz' }
      todoList.updateTodoItem(4,  updates)
      foundTodo = todoList.findTodo(4);
      expected= {
        completed: true,
        title: 'Foo Bar',
        month: '4',
        year: '2018',
        description: 'Wife is mad'
      }
      results = {
        completed: foundTodo.completed,
        title: foundTodo.title,
        month: foundTodo.month,
        year: foundTodo.year,
        description: foundTodo.description
      }
      expect(results).toEqual(expected);
      expect(foundTodo.qux).toBeUndefined();
    });

    it('should return the entire collection of todos', function () {
      allTodos = todoList.getAllTodos();
      expect(allTodos.length).toBe(4);
    });

    it('updates can only be done through updateTodoItem', function () {
      allTodos = todoList.getAllTodos();
      let todo = allTodos[0];
      todo.completed = true;
      expected = {
        id: 0,
        completed: true,
        title: 'Buy Milk',
        month: '1',
        year: '2017',
        description: 'Milk for baby',
      }
      results = {
        id: todo.id,
        completed: todo.completed,
        title: todo.title,
        month: todo.month,
        year: todo.year,
        description: todo.description
      }
      expect(results).toEqual(expected);

      todo = todoList.findTodo(0);
      expected = {
        id: 0,
        completed: false,
        title: 'Buy Milk',
        month: '1',
        year: '2017',
        description: 'Milk for baby',
      }
      results = {
        id: todo.id,
        completed: todo.completed,
        title: todo.title,
        month: todo.month,
        year: todo.year,
        description: todo.description
      }
      expect(results).toEqual(expected);
    });
  });

  describe('Operations on invalid data', function () {
    let todoData, updates;

    it('cannot add an empty string for title', function () {
      todoData = {
        title: '',
        month: '5',
        year: '2011',
        description: 'foo bar'
      }
      expect(() => { todoList.addTodoItem(todoData)}).toThrow(TypeError);
    });

    it('cannot add an empty string for description', function () {
      todoData = {
        title: 'Foo Bar',
        month: '5',
        year: '2011',
        description: ''
      }
      expect(() => { todoList.addTodoItem(todoData)}).toThrow(TypeError);
    });

    it('cannot update a todo item with an invalid month', function () {
      updates = { month: '13' };
      expect(() => { todoList.updateTodoItem(0, updates ) }).toThrow(TypeError);
    });

    it('cannot update a todo item with an invalid year', function () {
      updates = { year: '300' }
      expect(() => { todoList.updateTodoItem(1, updates)}).toThrow(TypeError);
    });
  });
});