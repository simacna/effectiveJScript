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




























