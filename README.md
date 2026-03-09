1️⃣ What is the difference between var, let, and const?

Answer : 

var, let, and const are used to declare variables in JavaScript. A variable is a container used to store data.

    var is the old way to declare variables. It can be re-declared and updated.

    let is the modern way. It can be updated but cannot be re-declared in the same scope.

    const is used for variables whose value should not change. It cannot be updated or re-declared.

2️⃣ What is the spread operator (...)?

Answer :

The spread operator (...) is used to expand or copy elements of an array or object. It spreads the elements into individual values.

Example
    const numbers = [1,2,3];
    const newNumbers = [...numbers,4,5];


3️⃣ What is the difference between map(), filter(), and forEach()?

Answer :

map(), filter(), and forEach() are JavaScript array methods.

    map() modifies each element and returns a new array.

    filter() selects elements based on a condition and returns a new array.

    forEach() runs a function on each element but does not return a new array.

Example : 

    const numbers = [1,2,3,4];

    numbers.map(n => n*2);
    numbers.filter(n => n>2);
    numbers.forEach(n => console.log(n));


4️⃣ What is an arrow function?

Answer:

An arrow function is a shorter and modern way to write functions in JavaScript. It uses the arrow symbol (=>) and makes the code shorter and cleaner. When an arrow function has only one expression (one line of code), JavaScript automatically returns the result. Because of this automatic return, we do not need to use curly braces {} or the return keyword. But when the function has multiple lines of code, JavaScript cannot automatically understand which value should be returned. Therefore, we must use curly braces {} to define the function body and explicitly write the return statement.

Example (one line arrow function):

    const add = (a,b) => a + b;

Example (multiple line arrow function):

    const add = (a, b) => {
    const result = a + b;
      return result;
    };


5️⃣ What are template literals?

Answer:

Template literals are a feature in JavaScript that make it easier to create and work with strings. They use backticks (` `) instead of single or double quotes. With template literals, we can easily insert variables or expressions inside a string using ${}. This makes the code cleaner, more readable, and easier to write compared to traditional string concatenation.

Example : 

    const name = "Rahim";
    const age = 20;

    console.log(`My name is ${name} and I am ${age} years old.`);