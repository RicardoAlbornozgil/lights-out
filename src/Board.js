import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(() => createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = Array.from({ length: nrows }, () => 
      Array.from({ length: ncols }, () => Math.random() < chanceLightStartsOn)
    );
    return initialBoard;
  }

  /** check if the player has won */
  function hasWon() {
    const won = board.every(row => row.every(cell => !cell));
    console.log("Has won:", won, board);
    return won;
  }

  /** flip the cells around a given cell */
  function flipCellsAround(coord, boardCopy) {
    const [y, x] = coord.split("-").map(Number);
    const flipCell = (y, x) => {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        boardCopy[y][x] = !boardCopy[y][x];
      }
    };

    flipCell(y, x);
    flipCell(y, x - 1); // left
    flipCell(y, x + 1); // right
    flipCell(y - 1, x); // above
    flipCell(y + 1, x); // below
  }

  function handleFlip(coord) {
    setBoard(oldBoard => {
      const boardCopy = oldBoard.map(row => [...row]);
      flipCellsAround(coord, boardCopy);
      return boardCopy;
    });
  }

  /** render the board */
  return (
    <div>
      {hasWon() ? (
        <div className="YouWonMessage">You Won!</div>
      ) : (
        <table className="Board">
          <tbody>
            {board.map((row, y) => (
              <tr key={y}>
                {row.map((cell, x) => (
                  <Cell
                    key={`${y}-${x}`}
                    isLit={cell}
                    flipCellsAroundMe={() => handleFlip(`${y}-${x}`)}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Board;