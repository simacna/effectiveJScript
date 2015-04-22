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

//git jason 