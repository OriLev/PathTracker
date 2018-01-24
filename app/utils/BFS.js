export default function findPath({ field, startPoint, endPoint, }) {
  const path = [];

  // tests if the point is inside the tested field
  const inField = function (point) {
    if (point[0] < field.length && point[0] >= 0) {
      if (point[1] < field[0].length && point[1] >= 0) {
        return true;
      }
    }
    return false;
  };

  // tests if the point was already
  const visited = function (point) {
    if (field[point[0]][point[1]].numberOfStepInPath < 0) {
      return false;
    }
    return true;
  };

  // tests if a certain step is allowed
  const allowedStep = function (point) {
    if (field[point[1]][point[0]].isAllowedToBeSteppedOn) {
      return true;
    } else if (!field[point[0]][point[1]].isAllowedToBeSteppedOn) {
      return false;
    }
  };

  // tests if the tested point is in fact the ending point of the search
  const isEndPoint = function (point) {
    if (point === endPoint) {
      return true;
    }
    return false;
  };

  // returns the neighbours of a certain point
  const getNeighbours = function (point) {
    const neighbours = [];
    const movementX = [ 1, -1, 0, 0, ];
    const movementY = [ 0, 0, 1, -1, ];
    for (let i = 0; i < 4; i++) {
      const neighbour = [];
      neighbour[0] = point[0] + movementY[i];
      neighbour[1] = point[1] + movementX[i];
      neighbours.push(neighbour);
    }
    return neighbours;
  };

  // tests if a certain point can be used (inside the board && allowed to be stepped in && was not visited)
  const legalPoint = function (point) {
    if (inField(point)) {
      if (allowedStep(point)) {
        if (!visited(point)) {
          return true;
        }
      }
    }
    return false;
  };

  // returns the neighbours that are valid points to be used
  const legalNeighbours = function (neighbours) {
    const legal = [];
    neighbours.forEach((neighbour) => {
      if (legalPoint(neighbour)) {
        legal.push(neighbour);
      }
    });
    return legal;
  };

  // the BFS algorithm that searches for a path between the 'start' and 'end' points
  // returns 'true' if a path was found and 'false' if not
  const pathExists = function () {
    if (legalPoint(startPoint) && legalPoint(endPoint)) {
      const testingQue = [ startPoint, ];
      field[testingQue[0][0]][testingQue[0][1]].numberOfStepInPath = 0;
      while (testingQue.length > 0) {
        const currStep = testingQue[0];
        if (currStep[0] === endPoint[0] && currStep[1] === endPoint[1]) return true;

        const currStepNum = field[currStep[0]][currStep[1]].numberOfStepInPath;
        const allowedSteps = legalNeighbours(getNeighbours(currStep));
        allowedSteps.forEach((nextStep) => {
          field[nextStep[0]][nextStep[1]].numberOfStepInPath = currStepNum + 1;
          field[nextStep[0]][nextStep[1]].previous = currStep;
          testingQue.push(nextStep);
        });
        testingQue.shift();
      }
    }

    return false;
  };

  // a function that filles the 'path' object with pairs of key = step number : value = the tile location
  const buildPath = function () {
    let stepNum = field[endPoint[0]][endPoint[1]].numberOfStepInPath;
    let currStep = endPoint;
    path[0] = startPoint;
    while (stepNum > 0) {
      path[stepNum] = currStep;
      stepNum--;
      currStep = field[currStep[0]][currStep[1]].previous;
    }
  };

  if (pathExists()) {
    buildPath();
  }

  return path;
}
