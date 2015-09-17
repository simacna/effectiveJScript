// Arrays and dictionaries

var dict = {alice:34, bob: 34, chris:62};
var people = []

for(name in dict){
	people.push(name + ":" + dict[name]);
}

people; //["alice: 34", "bob: 24", chris: 62]

// if the for loop was:

for (name in dict){
	people.push(name);
}

// the output would be ["alice", "bob", "chris"]
// so (name in dict), 'name' acts as the key to the value pair of the two

// in JS every objet inherits properties from its prototype object and the for...in loop enumerates an object's inherited
// properties as well as its "own" properties. 

//for eample what happens if we create a custom dictionary class that stores its elements as properties of the dictionary
// object itself

function NaiveDict(){}

NaiveDict.prototype.count = function(){
	var i = 0;
	for (var name in this){ //counts every property
		i++;
	}

	return i;
}


NaiveDict.prototype.toString = function(){
	return "[object NaiveDict]";
}

var dict = new NaiveDict();

dict.alice = 34;
dict.bob = 24;
dict.chris = 62;

dict.count(); // 5

//the mistake above is the same object is used to store both fixed properties of the NaiveDict data structure (count, toString) and the variable entries of the specific dictionary
// (alice, bob, chris). When count enumerates, the properties of a dictionary, it counts all of these properties instead of just the entries we care about

//similar mistake can happen with using Array type to represent dictionaries.


var dict = new Array();

dict.alice = 34;
dict.bob = 24;
dict.chris = 62;

dict.bob; //24

//Unfortunately this code is vulnerable to prototype pollution, where properties on a prototype object can cause unexpected properties to appear when enumerating dictionary entries.
// for example, another library in the application may decide to add some convenience methods to Array.prototype:

Array.prototype.first = function(){
	return this[0];
};

Array.prototype.last = function(){
	return this[this.length - 1]
};

// Now see what happens when we attempt to enumearate the elemnts of our array:

var names = []

for (var name in dict){
	names.push(name);
}

names; // ['alice', 'bob', 'chris', 'first', 'last']

//Example: we can simply replace new Array() above with new Object() or even an emtpy object literal. The result is much less susceptible to protype pollution:

var dict = {}

dict.alice = 34;
dict.bob = 24;

var names = []

for (var name in dict){
	names.push(name);
}

names; //['alice', 'bob']

//things to remember
//1. use object literals to construct lightweight dictionaries
//2. lightweight dictionaries should be direct descendants of Object.prototype to protect against p

// Use null prototypes to prevent prototype pollution (double check what prototype pollution is)

// with new ES, you can now do
var x = Object.create(null); 
//whereas before the following would occur and Object.prototype would not return null

function C(){}
C.prototype =  null; 

var o = new C();
Object.getPrototypeOf(o) === null; //false
Object.getPrototypeOf(o) === Object.prototype; //true







