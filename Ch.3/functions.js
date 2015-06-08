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























