// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      //console.log(row);
      var queen = 0;
      for (var i = 0; i < row.length; i++) {
        queen += row[i];
      }
      return queen > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var queen = 0;
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++) {
        queen += rows[i][colIndex];
      }
      return queen > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var columns = this.get('n');
      for (var i = 0; i < columns; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    //[0,0,0,0] row = 0, col =1  i =0; j = 1
    //[1,0,0,0] row = 1, col = 2  i = 1 j = 2
    //[0,0,0,0] row =2, col 2     i = 2 j = 3
    //[0,0,1,0] row 3 col 3

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // var rows = this.rows();
      // var row = 0;
      // var queen = 0;

      // for (var col = majorDiagonalColumnIndexAtFirstRow; col < rows.length; col++) {
      //   //console.log('row:  ' + row + '  col:  ' + col);
      //   queen += rows[row][col];
      //   row += 1;
      // }
      // return queen > 1;

      var rows = this.rows();
      var queens1 = 0;
      var queens2 = 0;
      var row1 = 0;
      var row2 = majorDiagonalColumnIndexAtFirstRow;
      for (var i = 0; i < rows.length; i++) {
        var i2 = i + majorDiagonalColumnIndexAtFirstRow;
        if (row1 < rows.length && i2 < rows.length) {
          //console.log('V1  row: ' + row1 + '   col: ' + i2);
          queens1 += rows[row1][i2];
        }
        if (row2 < rows.length) {
          //console.log('V2  row: ' + row2 + '   col: ' + i);
          queens2 += rows[row2][i];
        }
        row1++;
        row2++;
      }
      return queens1 > 1 || queens2 > 1;
    },


    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var cols = this.get('n');
      for (var i = 0; i < cols; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    // [0, 0, 1, 0]    3    check  0,3   1,2   2,1   3,0
    // [0, 0, 0, 1]    2    check  0,2   1,1   2,0
    // [1, 0, 1, 0]    1    check  0,1   1,0
    // [0, 1, 0, 0]    0    check  0,0

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var rows = this.rows();
      var queen1 = 0;
      var queen2 = 0;
      var row = 0;

      for (var col = minorDiagonalColumnIndexAtFirstRow; col >= 0; col--) {
        if (row < rows.length - 1 && row >= 0) {
          queen1 += rows[row][col];
          row++;
        }
      }
      var col2 = rows.length - 1;
      for (var row = minorDiagonalColumnIndexAtFirstRow; row < rows.length; row++) {
        if (col2 < rows.length && col2 >= 0) {
          queen2 += rows[row][col2];
          col2--;
        }
      }
      return queen1 > 1 || queen2 > 1; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var cols = this.get('n');
      for (var i = 0; i < cols; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
