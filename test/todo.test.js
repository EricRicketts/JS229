import { Todo } from '../code/todo';

describe('todo object behavior', function () {
  let todoData, todo, results, expected;
  describe('with valid data', function () {
    beforeEach(() => {
      todoData = {
        title: 'Buy Milk',
        month: '1',
        year: '2017',
        description: 'Milk for baby'
      };
      todo = new Todo(0, todoData);
    });

    it('should be an object', function () {
      expect(Object.prototype.toString.call(todo)).toBe('[object Object]');
    });

    it('cannot add properties to a todo object', function () {
      expect(() => { todo.foo = 'foo' }).toThrow(TypeError);
    });

    it('properties can be retrieved through getters', function () {
      results = [
        todo.id, todo.completed, todo.title, todo.month,
        todo.year, todo.description
      ];
      expected = [0, false, 'Buy Milk', '1', '2017', 'Milk for baby'];
      expect(results).toEqual(expected);
    });

    it('Once the todo id is set it cannot be modified', function () {
      expect(() => { todo.id = 1 }).toThrow(TypeError);
    });

    it('change properties through the setters', function () {
      todo.completed = true;
      todo.description = 'Buy food for cat';
      todo.title = 'Cat food';
      todo.month = '4';
      todo.year = '2018';

      expected = [true, 'Buy food for cat', 'Cat food', '4', '2018'];
      results = [
        todo.completed, todo.description,
        todo.title, todo.month, todo.year
      ];

      expect(results).toEqual(expected);
    });

    it('allow for identifying month and year of todo item', function () {
      expected = [true, false];
      results = [
        todo.isWithinMonthYear('1', '2017'), todo.isWithinMonthYear('1', '2016')
      ];
      expect(results).toEqual(expected);
    });
  });
});