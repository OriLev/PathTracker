const pathFind = (field, startP, endP) => {
	const path = [];

	// tests if the point is inside the tested field				
	var inField = function (point) {
		if (point[0]<field.length && point[0] >=0) {
			if (point[1]<field[0].length && point[1] >=0) {
				return true;
			}
		}
		return false;
	}

	// tests if the point was already
	var visited = function (point) {
		if (field[point[0]][point[1]].stepVisited<0) {
			return false;
		}
		return true;
	}

	// tests if a certain step is allowed
	var allowedStep = function (point) {
		if (field[point[1]][point[0]].allowed) {
			return true;
		} else if (!field[point[0]][point[1]].allowed) {
			return false;	
		}
	}

	// tests if the tested point is in fact the ending point of the search
	var isEndPoint = function(point) {
		if (point === endP) {
			return true;
		} else {
			return false;
		}
	}

	// returns the neighbours of a certain point
	var getNeighbours = function (point) {
		var neighbours = [];
		var movementX = [1, -1, 0, 0];
		var movementY = [0, 0, 1, -1];
		for (var i=0; i<4; i++) {
			let neighbour = [];
			neighbour[0] = point[0] + movementY[i];
			neighbour[1] = point[1] + movementX[i];
			neighbours.push(neighbour);
		}
		return neighbours;
	}

	// tests if a certain point can be used (inside the board && allowed to be stepped in && was not visited)
	var legalPoint = function (point) {
		if (inField(point)) {
			if (allowedStep(point)) {
				if (!visited(point)) {
					return true;
				}
			}
		}
		return false;
	}

	// returns the neighbours that are valid points to be used
	var legalNeighbours = function (neighbours) {
		var legal = [];
		neighbours.forEach(function(neighbour) {
			if (legalPoint(neighbour)) {
				legal.push(neighbour);
			}
		})
		return legal;
	}

	// the BFS algorithm that searches for a path between the 'start' and 'end' points
	// returns 'true' if a path was found and 'false' if not
	var pathExists = function() {
		if (legalPoint(startP) && legalPoint(endP)) {
			var testingQue = [startP];	
			field[testingQue[0][0]][testingQue[0][1]].stepVisited = 0;
			while(testingQue.length>0) {
				let currStep = testingQue[0];
				if (currStep[0] === endP[0] && currStep[1] === endP[1]) return true;

				let currStepNum = field[currStep[0]][currStep[1]].stepVisited;
				let allowedSteps = legalNeighbours(getNeighbours(currStep));
				allowedSteps.forEach(function(nextStep){
					field[nextStep[0]][nextStep[1]].stepVisited = currStepNum+1;
					field[nextStep[0]][nextStep[1]].previous = currStep;
					testingQue.push(nextStep);
				})
				testingQue.shift();
			}	
		}
		
		return false; 
	}

	// a function that filles the 'path' object with pairs of key = step number : value = the tile location
	var buildPath = function() {
		var stepNum = field[endP[0]][endP[1]].stepVisited;
		var currStep = endP;
		path[0] = startP;
		while (stepNum > 0) {
			path[stepNum] = currStep;
			stepNum--;
			currStep=field[currStep[0]][currStep[1]].previous;
		}
	}
	
	if (pathExists()) {
		buildPath();
		// gameService.pathExistsFlag = true;
	}

	return path;

}

module.exports = pathFind;