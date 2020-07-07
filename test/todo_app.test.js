import { TodoList, TodoManger  } from "../code/todoApp";

describe('todoApp', function () {
  let todoData1, todoData2, todoData3, todoData4, todoData5, todoData6, todoSet, todoList,
    todoManager, expected, results;
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
    results = todoManager.all();
    expect(results.length).toBe(6);
  });

});