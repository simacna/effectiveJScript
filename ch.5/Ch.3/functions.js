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
//3.25 - Use bind to Extract methods with a fixed receiver

var buffer = {
	entries:[], 
	add: function(x){
		this.entries.push(x); //why is this needed, obviously entries is within the object's 
	},
	concat: function(){
		return this.entries.join("");
	}
};

var source = ["one", "two", "three"];
source.forEach(buffer.add, buffer); //buffer is the receiver of the call to allow entries to be known
//if arr.forEach() did not offer providing a receiver for their callback (and instead use the global object as the callback)
//we could do the following:

source.forEach(function(s){
	buffer.add(s);
});
buffer.join(); //"onetwothree"

//this version creates a wrapper function that explicitly calls add as a method of of buffer.
//creating a version of a function that binds its receiver to a specific object is so common that ES5 added library 
//for support. Function objects come with a bind method that takes a reciever object and produces a wrapper function 
//that calls the original function as a method of the reciever

var source = ["one", "two", "three"];
source.forEach(buffer.add.bind(buffer));
buffer.concat(); //onetwo

//buffer.add.bind(buffer) creates a new function rather than modifying the buffer.add and the old one is unchanged

buffer.add === buffer.add.bind(buffer); //false

//things to remember
//1. Beware that extracting a method does not bind the method's receiver to its object
//2. When passing an object's method to a higher-order function, use an anonymous function to call the method on the 
//appropriate receiver
//3. Use bind as a shorthand for creating a function bound to the appropriate receiver

//3.26 - Use bind to curry functions

function simpleURL(protocol, domain, path){
	return protocol + '://' + domain + "/" + path;
}

var urls = paths.map(function(path){
	return simpleURL("http", siteDomain, path);
});

//say if we had paths = ['hi', 'sometehing']; then running the above urls would give us an array with two url's
//an alternate version is below using currying (binding a function to a subset of its arguments)

var urls = paths.map(simpleURL.bind(null, "http", siteDomain));


//things to remember
//1. Use bind to curry a function, that is, to create a delegating function with a fixed subset of the required arguments
//2. Pass null or undefined as the receiver arguments to curry a function that ignores its receiver

//3.28: Avoid relying on the toString method of functions

// JS functions come with the ability to reproduce their source code as a toString

(function(x){
	return x + 1;
}).toString(); //'function(x){ \n return x + 1; \n'


//3.29 - Avoid nonstandard stack inspection









 











