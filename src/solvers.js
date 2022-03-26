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
//[1,0,0,0]
//[0,1,0,0]
//[0,0,1,0]
//[0,0,0,1]

window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var rows = board.rows();
  var solution = undefined; //fixme
  //debugger;
  var helper = function(row) {
    if (row === n) {
      return;
    }
    for (var i = 0; i < rows.length; i++) {
      rows[row][i] = 1;
      if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
        rows[row][i] = 0;
        continue;
      }
      if (row < rows.length) {
        helper(row + 1);
      }
    }
  };
  helper(0);
  solution = rows;
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

//[1,0,0,0]
//[0,1,0,0]
//[0,0,0,1]
//[0,0,1,0]
// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});
  var rows = board.rows();
  var taken = {};
  var nRook = function(row) {
    for (var i = 0; i < rows.length; i++) {
      if (taken[i] === 1) { continue; }
      rows[row][i] = 1;
      taken[i] = 1;
      if (row < n - 1) {
        nRook(row + 1);
      } else {
        if (!board.hasAnyColConflicts() && !board.hasAnyRowConflicts()) {
          solutionCount++;
        }
      }
      rows[row][i] = 0;
      taken[i] = 0;
    }
  };
  nRook(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other

//[1,0,0,0]
//[0,0,1,0]
//[0,0,0,0]
//[0,0,1,0]

// window.findNQueensSolution = function(n) {
//   var solution = undefined;
//   var board = new Board({n: n});
//   var rows = board.rows();
//   var found = false;
//   var taken = {};
//   var queen = function(row) {
//     for (var col = 0; col < rows.length; col++) {
//       if (taken[col] === 1) { continue; }
//       rows[row][col] = 1;
//       taken[col] = 1;
//       if (row < n - 1) {
//         queen(row + 1);
//       } else {
//         if (!board.hasAnyQueensConflicts()) {
//           found = true;
//           return;
//         }
//       }
//       if (found) {
//         return;
//       }
//       rows[row][col] = 0;
//       taken[col] = 0;
//     }
//   };

//   queen(0);
//   solution = rows;
//   return solution;
// };
window.findNQueensSolution = function(n) {
  var solution = undefined;
  var board = new Board({n: n});
  var rows = board.rows();
  var found = false;
  var nqueen = function (row) {
    if (row === n) {
      found = true;
      return;
    }

    for (var col = 0; col < n; col++) {
      rows[row][col] = 1;
      if (!board.hasAnyQueensConflicts()) {
        nqueen(row + 1);
      }
      if (found) {
        return;
      }
      rows[row][col] = 0;
    }
  };

  nqueen(0);
  solution = rows;
  return solution;

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  var rows = board.rows();

  var nqueen = function (row) {
    if (row === n) {
      solutionCount = solutionCount + 1;
      return;
    }

    for (var col = 0; col < n; col++) {
      rows[row][col] = 1;
      if (!board.hasAnyQueensConflicts()) {
        nqueen(row + 1);
      }
      rows[row][col] = 0;
    }
  };
  nqueen(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
