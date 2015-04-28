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