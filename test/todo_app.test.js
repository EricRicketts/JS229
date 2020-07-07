import { TodoList, TodoManger  } from "../code/todoApp";

describe('todoApp', function () {
  let todoData1, todoData2, todoData3, todoData4, todoData5, todoData6, todoSet, todoList,
    todoManager, foundTodos, expected, results;
  beforeAll(() => {
    todoData1 = {
      title: 'Buy Milk',
      month: '1',
      year: '2017',
      description: 'Milk for baby',
    };

    todoData2 = {
      title: 'Buy Apples',
      month: '1',
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

    todoData5 = {
      title: 'Buy Dress',
      month: '7',
      year: '2019',
      description: 'Present for wife',
    };
    
    todoData6 = {
      title: 'Buy Book',
      month: '2',
      year: '2020',
      description: 'Indulge myself',
    };
    
    todoSet = [todoData1, todoData2, todoData3, todoData4, todoData5, todoData6];
    todoList = new TodoList(todoSet);
    todoManager = new TodoManger(todoList);
  });

  it('todo manager returns all todo objects in an array', function () {
    results = todoManager.allTodos();
    expect(results.length).toBe(6);
  });

  it('todo manager returns all completed todo objects in an array', function () {
    todoList.updateTodoItem(0, { completed: true });
    todoList.updateTodoItem(2, { completed: true });
    results = todoManager.allCompletedTodos();
    expect(results.length).toBe(2);
    expected = [0, 2];
    expect([results[0].id, results[1].id]).toEqual(expected);
  });

  it('todo manager returns a list of todos based on month and year criteria', function () {
    foundTodos = todoManager.findByMonthAndYear('1', '2017');
    expect(foundTodos.length).toBe(2);
    results = [foundTodos[0].id, foundTodos[1].id];
    expected = [0, 1];
    expect(results).toEqual(expected);
  });

  it('todo manager returns a list of todos based on monty, year, and completed criteria', function () {
    foundTodos = todoManager.findCompletedByMonthAndYear('1', '2017');
    expect(foundTodos.length).toBe(1);
    expect(foundTodos[0].id).toBe(0);
  });
});