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