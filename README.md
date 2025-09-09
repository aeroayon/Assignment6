1) Difference between var, let, and const

In JavaScript, var is the old way of declaring variables. 
It can be re-declared and re-assigned, but it does not follow block scope, so sometimes it creates confusion. 
let is a newer way that respects block scope, meaning it only works inside the { } where it is written. 
You can re-assign its value but cannot re-declare it in the same block. const is used when you don’t want the value to change.
Once you assign a value to const, it cannot be re-assigned. So, var is flexible but risky, let is safer for changing values, and const is used for fixed values.

2) Difference between map(), forEach(), and filter()

All three are used to work with arrays, but they are slightly different. 
forEach() is used when you just want to loop through the array and do something with each item, but it does not return anything new.
map() also loops through the array, but it creates a new array with the modified values. On the other hand, filter() checks each item and only returns those that meet a condition, forming a new array. So, forEach is for looping, map is for transforming, and filter is for picking specific items.

3) What are arrow functions in ES6?

Arrow functions are a shorter and cleaner way to write functions in JavaScript.
Instead of writing the full function keyword, we can use an arrow =>. They make the code look simpler and are very useful for small functions.
Another important point is that arrow functions do not have their own this keyword, so they behave differently compared to normal functions when used inside objects or classes. 
In short, arrow functions are modern, short, and easier to use.

4) How does destructuring assignment work in ES6?

Destructuring allows us to take values out of arrays or objects and store them into variables in a simple way.
Instead of accessing each property one by one, we can “unpack” them directly. For example, from an object {name: "Ayon", age: 20}, we can directly write const {name, age} = person; to get both values. 
The same works for arrays. It makes the code cleaner and easier to read.

5) Explain template literals in ES6. How are they different from string concatenation?

Template literals are a new way to work with strings in ES6.
Instead of using + to join text and variables, we use backticks (`) and put variables inside ${ }. 
For example: `Hello, my name is ${name}`. This makes writing strings easier and more readable, especially when combining multiple variables or writing multi-line text.
The main difference is that string concatenation uses + and becomes messy, while template literals use backticks and look cleaner.
