/* eslint-disable react/no-array-index-key */
const GameBoard = function ({ onPlayerMove, board }) {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  type="button"
                  onClick={(e) => {
                    onPlayerMove(rowIndex, colIndex);
                    // e.target.setAttribute("disabled", "");
                    // Disabling button after first click, or (better) conditionally on symbol being null
                  }}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
