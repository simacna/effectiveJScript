//Ch. 3 - Working with functions

//3.18 - difference between function, method, and constructor calls

//simplest usage pattern is the function call:

function hello(username){
	return "hello, " + username;
}

hello("Sina Sima"); //"hello, Sina Sima"

//methods in JS are nothing more than object properties that happen to be functions:

var obj = {
	hello: function(){
		return "hello, " + this.username;
	},
	username: "Sina Sima"
};

//example of 'this' being used in function to be passed into method

function hello(){
	return "hello, " + this.username;
}

var obj ={
	hello : hello,
	username: 'sina sima'
};

obj.hello() //'hello, sina sima'

//third use of functions is as constructors. Just like methods and plain functions, constructors are defined with function:

function User(name, passwordHash){
	this.name = name;
	this.passwordHash = passwordHash;
}

var u = new User('sina', 'dadagohagoang');
u.name //sina

//3.19 - get comfortable with using higher order functions

//higher-order functions are nothing more than functions that take other functions as arguments or return functions as their result and JS uses it heavily



//below is two different ways of capitaling an array. The first uses a for loop, second we use map() and pass in a function


var names = ["firstname" , "secondname"];

function cap(list){
  for(var i = 0; i < names.length; i++){
  names[i] = names[i].toUpperCase();
  
  }
  return names;
}

var upper = names.map(function(name){
 return name.toUpperCase();
});

//telltale sign of a higher-order abstraction waiting to happen is duplicate or similar code. A benefit of HOF is
//fixing just one instace will affect all other instances and no need to hunt down other parts of code

//3.20: Use call to Call Methods with a custom receiver

//3.21 Use apply to call functions with different numbers of arguments

//the function below can take multiple paramets - functions like this are named variadic/variable-arity function compared
//to fixed-arity version which taks a fixed number of parameters -- in this case probably a single argument array of 
//values

averageOfArray([1,2,3]) //3

average(1,2,3); //3
average(1);
average(3, 1, 4, 9);

//variadic version is ore concise and arguably more elegant. Variadic functions have convenient syntax, at least when the
//caller knows ahead of time exactly how many arguments to provide

//apply method takes an array of arguments and calls the function as if each element of the array were an individual
//argument of the call.
//below imagine having an array of values store in scores. apply takes a first argument that specifies the binding of
//this for the function being called. since our average functin does not refer to this, we will put null

var scores = getAllScores();
average.apply(null, scores);


//if scors turns out to have for ex. 3 elements, this will behave the same as if we had written:

average(scores[0], scorse[1], scores[2]);

//things to remember:
//1. Use the apply method to call variadic functions with a computed array of arguments
//2. Use the first argument of apply to provide a receiver for variadic methods

//3.22 - Use arguments to create variadic functions 

//js provides every function with an implicit local variable called arguments: it contains indexed properties for each
//actual argument and a length property indicating how many arguments were provided.

function average(){
	for (var i = 0, sum = 0, n = arguments.length; i < n; i++){
		sum += arguments[i];
	}

	return sum/n;
}

//3.23 - Never modify the arguments object
//3.24: Use a variable to save a reference to arguments














 









