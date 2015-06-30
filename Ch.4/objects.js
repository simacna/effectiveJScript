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

// Item 3.35 - Use closures to store private data
// 
// JS object system does not particularly encourage or enforce information hiding.  Often developers resort to coding conventions rather than any absolute enforcement mechanism
// for private propertis by using naming conventions such as prefixing or suffexing private property names with an underscore character (_). This does nothing to enforce information hiding.
// 
// Some programs actually call for higher degree of hiding.
// 
// Closures store data in their enclosed variables without providing direct access to these variables. The only way to gain access to the internals of a closure is for the
// function to provide access to it explicitly.  In other words, objects and closures have opposite policies: The properties of an object are automatically exposed, whereas the variables
// in a closure are automatically hidden.

// Instead of storing the data as properties of the objects, we store it as variables in the constructor and turn the methods of the object into closures that refer to those variables. 
// 
// Example: we'll use the User class from Item 30

function User(name, passwordHash){
	this.toString = function(){
		return "[User " + name + "]";
	};
	this.checkPassword = function(password){
		return hash(password) === passwordHash;
	};
}

// Notice how unlike the other implementation, the toString and checkPassword methods refer to name and passwordHash as variables, rather than as properties of this. An instance
// of User now contains no instance properties at all, so outside code has no direct access to the name and password hash of an instance of User. 
// 
// Downside of this is that in order for the variables of the constructor to be in scope of the methods that use them, the methods must be placed on the instance object.
// This can lead to a proliferation of copies of methods as previously discussed (rather than adding methods to the prototype). 
// 
// Things to remember:
// 
// 1. Closure variables are private, accessible only to local references
// 2. Use local variables as private data to enforce information hiding within methods
// 
// Item 3.36 - store instances state only on instance objects 
// Store per-instance data on the instance object and not the prototype - aka if data is mutable, place it on the instance object. Example below:
// 
// the below is incorrect:

function Tree(x){
	this.value = x;
}

Tree.prototype = {
	children : [],
	addChild: function(x){
		this.children.push(x);
	}
};

// consider what happens when we try to construct a tree with this class:

var left = new Tree(2);
left.addChild(1);
left.addChild(3);

var right = new Tree(6);
right.addChild(5);
right.addChild(7);

var top = new Tree(4);
top.addChild(left);
top.addChild(right);

top.children; //[1,3,5,7,left, right]

// Each time we call addChild, we append a value to Tree.prototype.children, which contains the nodes in the order of any calls to addChild anywhere! This leaves the Tree
// objects in the incoherent state showin in 4.5.
// 
// The correct way to implement the Tree class is to create a separate children array for each instance object:

function Tree(x){
	this.value = x;
	this.children = []; //instance state
}

Tree.prototype = {
	addChild: function(x){
		this.children.push(x);
	}
}

// The moral is stateful data can be problematic when shared. Methods are generally safe to share between multiple instances of a class because they are typically stateless. 
// Methods are by far the most common data found on prototype objects. Per instance state, meanwhile, must be stored on instance objects. 


// Things to remember:
// 1. Mutable data can be problematic when shared, and prototypes are shared between all their instances
// 2. Store mutable per-instance state on instance objects
// 
// 
// Item 3.37 - Recognize the implicit binding of this
// 
// this keywoard is bound to the closest function that is calling it. map() accepts a second parameter where this can be passed to (similar to forEach)
// 
// What if map() did not accept a second parameter to refer to the outer this? We would use a lexically scoped variable to save an additional reference to the outer
// binding of this:

CSVReader.prototype.read = function(str){
	var lines = str.trim().split(\/n/);
	var self = this; //save a reference to outer this-binding
	return lines.map(function(line){
		return line.split(self.regexp); //use outer this
	});
}


// Programmers commonly use the variable name self for this pattern

// Another valid ES5 is to use callback function's bind method

CSVReader.prototype.read = function(str){
	var lines = str.trim().split(\/n/);
	return lines.map(function(line){
		return str.split(this.regexp);
	}.bind(this)); //bind to outer this-binding
};

var reader = new CSVReader();

reader.read("a,b,c\nd,e,f\n");

// Things to remember:
// 1. The scope of this is always determined by its nearest enclosing function
// 2. Use a local variable, usually called self, me, or that to make a this-=binding available to innder functions. 

// Item 3.38 - Call Superclass constructors from subclass constructors 

function Scene(context, width, height, images){
  this.context = context;
  this.width = width;
  this.height = height;
  this.images = images;
  this.actors = [];
}

Scene.prototype.register = function(actor){
  this.actors.push(actor);
};

Scene.prototype.unregister = function(actor){
  var i = this.actors.indexOf(actor);
  
  if (i >= 0){
    this.actors.splice(i, 1); //first parameter is where to delete, 2nd is how many items, rest (optional) would be what to add into array
  }
};

















