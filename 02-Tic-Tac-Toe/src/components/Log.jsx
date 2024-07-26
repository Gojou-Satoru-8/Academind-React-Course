const Log = function ({ moves, players }) {
  return (
    <ol id="log">
      {moves.map((move) => {
        // const player = move.player === "X" ? 1 : 2;
        const player = players[move.player];
        const { row, col } = move.square;
        return (
          <li key={`${player},${row},${col}`}>
            {player} selected square at row {row}, column {col}
          </li>
        );
      })}
    </ol>
  );
};

export default Log;
