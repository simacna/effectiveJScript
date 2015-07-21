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











