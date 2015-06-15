// Ch. 4 Objects and Prototypes

// Objects are js's fundamental data structure. Like many OOP languages, js supports implementation inheritance:
// the reuse of code or data through a dynamic delegation mechanism. But unlike many conventional languages, js's 
// inheritance mechanism is based on prototypes rather than classes.
//instead of objects being an instance of a class, they inherit from other objects. Every object is associated with some
// other object, known as its prototype. 

// 4.30 - understand the difference betwen prototype, getPrototypeOf, and __proto__

// Prototypes involve three separate but related accessors:
// 1. C.prototype is used to establish the prototype of objects created by new C()
// 2. Object.getPrototypeOf(obj) is the standard ES5 mechanism for retrieving obj's prototype object
// 3. obj.__proto__ is a nonstandard mechanism for retrieving obj's prototype object

// Ex.

function User(name, passwordHash){
	this.name = name;
	this.passwordHash = passwordHash;

};

User.prototype.toString = function(){
	return "[User " + this.name + "]";
};

User.prototype.checkPassword = function(password){
	return hash(password) === this.passwordHash;
};

var u = new User('sina', 'abcdefg');


// When we create an instance of User with the new operator, the resultant object u gets the object stored as 
// User.prototype automatically assigned as its prototype object. 

// Object.getPrototypeOf() can be used to retrieve the prototype of an existing object. 
// E.g. after we create the object u in the example above, we can test:

// Object.getPrototypeOf(u) === User.prototype; //true

// Classes in JS are essentially the combination of a constructor function (User) and a prototype object used to share 
// methods between instances of the class (User.prototype)

//Things to remember:
// 1. C.prototype determines the prototype of objects created by new C()
// 2. Object.getPrototypeOf(obj) is the standard ES5 function for retrieving the prototype of an object
// 3. A class is a design pattern consisting of a construction function and associated prototype

//3.31 - Prefer Obj.getPrototypeOf to __proto__ 
//3.33 - Make your constructors new-Agnostic

// When you create a constructor such as the User function in Item 30, you rely on callers to remember to call it
// with the new operator. 

function User(name, hash){
	this.name = name;
	this.hash = hash;
}

// If a caller forgets the new keyword, then the function's receiver becomes the global object

var u = User("sina", "password");
u; //undefined
this.name //sina
this.password //password

If you had a name/password global variable, it would override

If the user function is defined as ES5 strict code, then the receiver defaults to undefined

function User(name, password){
	"use strict";
	this.name = name;
	this.password = password;
}

var u = User('sina', 'password'); //error: this is undefined

// int his case, the faulty call leads to an immediate error: the first line of User attempts to assign to this.name,
// which throws a TypeError


// A more robust approach is to provide a function that works as a constructor no matter how it's called. An 
// easy way to implement this is to check that the receiver value is a proper instance of User:

//here several examples are shown but seems too... tedious

//things to remember:
// 1. Make a constructor agnostic to its caller's syntax by reinvoking itself with new or Object.create
// 2. Document clearly when a function expects to be called with new

//Item 34: Store methods on prototypes

//it's perfectly possible to add methods to the User class for example:

function Uer(name, password){
	this.name = name;
	this.password = password;

	this.toString = function(){
		return "User: " + this.name;
	}

	this.checkPassword = function(psw){
		return (psw === this.password);
	};
}

// Storing methods on a prototypemakes them available to all instances without requiring multiple copies of the 
// functions that implement them or extra properties on each instance object. 

//And instance methods are almost certain to use more meory than prototype methods

// things to remember:
// 1. Storing methods on instance objects creates multiple copies of the functions, one per instance object
// 2. Prefer storing methods on prototypes over storing them on instance objects 
















