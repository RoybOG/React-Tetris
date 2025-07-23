function Board({ children, height = '20em', width = '20em' }) {
  const board_style = {
    height,
    width,
  };
  return (
    <main className="gameBoard" style={board_style}>
      {children}
    </main>
  );
}

export default Board;
