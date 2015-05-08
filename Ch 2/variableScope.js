//Notes taken on ch. 2 - variable Scope

//Ex. 1

//This example shows using the same variables i,n,sum inside the scope of
//each function 
//questions: 1) in the score function, what is player.levels.length? I'll google this

function averageScores(players) {
	var i, n, sum; 
	sum = 0;
	for (i = 0, n = players.length; i < n; i++)  {
		sum += score(players[i]);
	}
	return sum / n;
}

function score(player) {
	var i, n, sum; 
	sum = 0;
	for (i = 0, n = player.levels.length; i < n; i++) {
		sum += player.levels[i].score;
	}

	return sum;
}

//global objects are bount to the global window
//foo = 'global foo';
//this.foo //'global foo'

//updating global objects automatically updates global namespace
//var foo = 'global foo';
//this.foo = 'changed';
//foo; //'changed'

//above shows we have two ways of creating global variables. Either declare var in the global scope OR add it to global object
//var declaration better since more clearly conveys the effect on the program's scope. 

//2.9using a variable name for the first time without the var term will automatically create a global variable. example:

function swap(a, i, j) {
	temp = a[i];
	a[i] = a[j];
	a[j] = temp;
}

//above, temp has never been declared, so it gets added to the global scope. correct version below:

function swap2(a, i, j) {
	var temp = a[i];
	a[i] = a[j];
	a[j] = temp;
}

//Things to remember:
// 1) Always declare new local variables with var
// 2) Consider using lint tools to help check for unbound variables


//chapter 2.11 -- closures. Three things to mainly know about them

//#1 - JS allows you to refer to variables that were defined outside of the current function. Example below:

function makeSandwich(){
	var magicIngredient = 'peaunut butter';
	function make(filling){
		return magicIngredient + 'and' + filling;
	}
	
	return make('jelly');
	
}

makeSandwich(); //'peanut butter and jelly'

//#2 - functions can refer to variables defined in outer functions even after those outer functions have returned. Personal note: this is strange, do more online research on this

function sandwichMaker(){
	var magiIngredient = 'peanut butter';
	function make(filling){
		return magicIngredient + ' and ' + filling;
	}
	return make;
}

var f = sandwichMaker(); //the whole value of f is the returned make function
f("jelly"); //"peanut butter and jelly"
//functions that keep track of variables from their containing scopes are known as closures
//the make function is a closure whose code refers to two outer variables: magicIngredient and filling

//example taken from Mozilla (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
//lexical scope vs closure
//lexical:

function init() {
  var name = "Mozilla"; // name is a local variable created by init
  function displayName() { // displayName() is the inner function, a closure
    alert(name); // use variable declared in the parent function    
  }
  displayName();    
}
init();

//closure example. below running the program will give the same output as the above

function makeFunc() {
  var name = "Mozilla";
  function displayName() {
    alert(name);
  }
  return displayName;
}

var myFunc = makeFunc(); //	QUESTION -- why won't the output (alert showing "Mozilla") if makeFunc(); called on its own?
myFunc();


















