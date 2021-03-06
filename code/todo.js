function TodoItem(id, data) {
  Object.defineProperty(this, 'id', {
    value: id,
    enumerable: true,
    configurable: true,
    writable: false
  });
  this.completed = false;
  this.title = data.title;
  this.month = data.month;
  this.year = data.year;
  this.description = data.description;
  this.isWithinMonthYear = function(month, year) {
    return this.month === month && this.year === year;
  }
  return Object.preventExtensions(this);
}

export { TodoItem };