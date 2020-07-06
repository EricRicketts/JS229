  function Todo (id, data) {
    Object.defineProperty(this, 'id', {
      value: id,
      writable: false,
      enumerable: true,
      configurable: false
    });
    this.completed = false;
    this.title = data.title;
    this.description = data.description;
    this.month = data.month;
    this.year = data.year;
    this.isWithinMonthYear = function(month, year) {
      return this.year === year && this.month === month;
    }

    return Object.seal(this);
  }


export { Todo };