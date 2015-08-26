/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findSolution = function(row, n, board, validator, callback) {
    //refactor to get access to n
    //we added in parameters to take care of that.
    //declaring solutionCount at the beggining would just count, we want this to be reused to do more than count,
    //also do work for us. a callback will take care of that!
    //validator function to check if hasAnyRooks or QueensConflicts

    // if all rows exhausted. if you are at the n, 
    //that means you have reached all rows.  
    if (row === n) {
      
        return callback();
      
    };
    //var row = n - rowsLeft;

    // iterate over possible decisions
    for (var i = 0; i < n; i++) {
        //the toggling makes it backtracking.  

        //place a piece
        board.togglePiece(row, i);
        //recurse into remaining problem
        if (!board[validator]()) {
            findSolution(row + 1, n, board, validator, callback);
        }

        //unplace a piece
        board.togglePiece(row, i);
    }


}

window.findNRooksSolution = function(n) {
    var solution = undefined; //fixme

    var board = new Board({
        n: n
    });

    findSolution(0, n, board, "hasAnyRooksConflicts", function() {
        solution = _.map(board.rows(), function(row){
          return row.slice();
        });
    });

    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
    return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
    var solutionCount = 0; //fixme

    var board = new Board({
        n: n
    });

    findSolution(0, n, board, "hasAnyRooksConflicts", function() {
        solutionCount++;
    });

    console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
    return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

    var board = new Board({
        n: n
    });
    var solution = board.rows();

    

    findSolution(0, n, board, "hasAnyQueensConflicts", function() {
        solution = _.map(board.rows(), function(row){
          return row.slice();
        });
    });

    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
    return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
    var solutionCount = 0; //fixme

    var board = new Board({
        n: n
    });

    findSolution(0, n, board, "hasAnyQueensConflicts", function() {
        solutionCount++;
    });

    console.log('Number of solutions for ' + n + ' queens:', solutionCount);
    return solutionCount;
};
