const GameOver = function ({ winner, onRematch }) {
  // NOTE: winner is either of the players, or undefined in case of matchDrawn = true
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner ? <p> {winner} won</p> : <p>Match Drawn</p>}

      <p>
        <button type="button" onClick={onRematch}>
          Rematch
        </button>
      </p>
    </div>
  );
};

export default GameOver;
