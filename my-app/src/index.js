import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
var textColor = "LightGray";
if (props.value === "X")
  textColor = "Magenta";
else if (props.value === "O")
  textColor = "Orange";

return (
    <button className="square" onClick={() => props.onClick()}>
      <text style={{color: textColor}}>
        {props.value}
      </text>
      </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.renderPlayerSymbol();
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  renderPlayerSymbol() {
    return this.state.xIsNext ? 'X' : 'O';
  }
  
  renderSquare(i) {
    return (
      <Square
        value = {this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <h1>Whammo!</h1>
        <div className="status">Next Player: {this.renderPlayerSymbol()}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
