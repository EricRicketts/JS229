# JS229 Take Home Assessment

## Instructions For Running the Tests
The zipped file contains a directory and all files within the directory.

to unzip (on macos) ```unzip JS229.zip```

You should have a ```code``` and ```test``` directory with the appropriate files and a ```.babelrc``` file along
with a ```packge.json``` file.

I used Jest for unit testing.  To install the code to run the tests => ```npm install```

Key files for install to be successful are ```.babelrc``` and ```package.json```

To run all tests =>  ```npm test test/*```

To run individual tests:

1. ```npm test test/todo.test.js```
2. ```npm test test/todo_list.test.js```
3. ```npm test test/todo_app.test.js```

## Design Decisions

### todo item

My decision here was to use the todo item as nothing more that a data container with an additional requirement
for one method ```isWithinMonthYear```.  My only constraint was as required, a todo object has only the 
following properties and shared methods:
1. id (must be unique) 
2. title
3. completed
4. month
5. year
6. description
7. isWithinMonthYear method

The returned object was inhibited from adding any more properties and the id was non-writable because it had to be
unique.  As you can see in my test, I wrote assertions verifying I could not add any more properties to a todo object
and that the id property was read only.

### todo list

This is where the bulk of my logic was and due to the requirements of the todo list, I think it made sense to
put the bulk of my logic in this object.

The todo list had three main responsibilities:
1. Ensure data integrity for each todo item, this was a derived requirement.
2. Create and maintain a collection of todo items.
3. The collection itself was not accessible to the public for modification except for certain authorized methods.

As you can see in my tests for the todo list for todo item initialization, todo item addition, and todo item updates
checks were run for data integrity.  The title and description properties could not be empty strings, the
month string has to be 1 through 12 or empty, and year strings could not be a year less than 1900 or a year larger than
2999.  The year was somewhat difficult to nail down I could have been more restrictive. 

The collection itself was put into a local variable, thereby ensuring privacy.

In order to ensure data integrity when a todo item was found by id, I returned a new instance of a todo item so
that the original data could not be changed.  The same process occurred when I retrieved the entire collection as
I returned a list of new instances but with the same properties as the original collection.  In both cases I have
test to prove that I maintain data integrity of both an individual todo item and the todo items collection.    

The only methods allowed to change the actual were todo item deletion, todo item addition and todo item update.  For
the update I ensured any number of valid properties could update a given todo item.

### todo manager

This code was relatively straightforward, with the todo item and todo list tested thoroughly all the todo manager
had to do was call the appropriate todo item and todo list methods and filter the results.

As per the requirements the todo manager operated on a todo list.

### todo application

This was simply an object which had todo list and todo manager properties.

