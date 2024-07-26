import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Log from "./components/Log";
import winningCombinations from "./winning-combinations";

const initGameBoard = Array.from({ length: 3 }, () => new Array(3).fill(null));
// OR new Array(3).fill(new Array(3).fill(null))

const App = function () {
  // const [activePlayer, setActivePlayer] = useState("X");
  // STATE VARIABLES:
  const [playerNames, setPlayerNames] = useState({ X: "Player 1", O: "Player 2" });
  const [gameMoves, setGameMoves] = useState([]);

  // VARIABLES DERIVED FROM STATE VARIABLES:
  const activePlayer = gameMoves.at(0)?.player === "X" ? "O" : "X";
  // Deriving current state of gameBoard state based on moves:
  const gameBoard = structuredClone(initGameBoard);
  gameMoves.forEach((move) => {
    const { row, col } = move.square;
    const { player } = move;
    gameBoard[row][col] = player;
  });

  // CHECKING WINNER:
  let winner;
  for (const combination of winningCombinations) {
    const squares = combination.map((coordinates) => gameBoard[coordinates.row][coordinates.column]);
    console.log(squares);
    let hasWinner = false;
    for (let i = 0; i < squares.length; i++) {
      if (!(squares.at(i) !== null && squares.at(i) === squares.at((i + 1) % 3))) {
        hasWinner = false;
        break;
      } else hasWinner = true;
    }
    if (hasWinner) {
      winner = playerNames[squares.at(0)];
      break;
    }
  }
  console.log(winner);

  // CHECKING DRAW CONDITION:
  const matchDrawn = gameMoves.length === 9 && !winner;

  // STATE UPDATING FUNCTIONS:
  const handlePlayerMove = function (rowIndex, colIndex) {
    // setActivePlayer((current) => (current === "X" ? "O" : "X"));
    setGameMoves((currentMoves) => {
      const updatedMoves = structuredClone(currentMoves);

      const currentPlayer = currentMoves.at(0)?.player === "X" ? "O" : "X";
      // NOTE: currentPlayer = activePlayer is suboptimal as we have no control over which player is active when this scheduled callback is run. Hence, always derive it from previous state.

      updatedMoves.unshift({ square: { row: rowIndex, col: colIndex }, player: currentPlayer });

      return updatedMoves;
    });
  };

  const handleRematch = function () {
    setGameMoves([]);
  };

  const handlePlayerNameChange = function (symbol, newName) {
    setPlayerNames((currentNames) => ({ ...currentNames, [symbol]: newName }));
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initName={playerNames.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onNameSave={handlePlayerNameChange}
          />
          <Player
            initName={playerNames.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onNameSave={handlePlayerNameChange}
          />
        </ol>
        {(winner || matchDrawn) && <GameOver winner={winner} onRematch={handleRematch} />}
        <GameBoard onPlayerMove={handlePlayerMove} board={gameBoard} />
      </div>
      <Log moves={gameMoves} players={playerNames} />
    </main>
  );
};

export default App;
