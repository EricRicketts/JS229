import { TodoList } from "../code/todo_list";

describe('TodoList', function () {
  let expected, results;
  describe('Operations on valid data', function () {
    let todoData1, todoData2, todoData3, todoData4, todoSet, todoList, foundTodo;
    beforeEach(() => {
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
      
      todoSet = [todoData1, todoData2, todoData3, todoData4]
      todoList = new TodoList(todoSet);
    });

    it('should return a todo list object with 4 todo items', function () {
      expect(todoList.numberOfTodos()).toBe(4);
    });

    it('returns a todo Object based on the id property', function () {
      foundTodo = todoList.findTodo(2);
      let results = {
        title: foundTodo.title,
        month: foundTodo.month,
        year: foundTodo.year,
        description: foundTodo.description
      }
      expect(results).toEqual(todoData3);
    });

    it.skip('should add a new todo item', function () {
      let todoData5 = {
        title: 'Buy novel',
        month: '4',
        year: '2018',
        description: 'Present for wife'
      }
      todoList.addTodoItem(todoData5);
      expect(todoList.numberOfTodos()).toBe(5);
    });
  });
});