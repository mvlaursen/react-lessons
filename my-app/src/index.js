import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//---------------------------------------------------------------------
// Board
//---------------------------------------------------------------------

class Board extends React.Component {
/*  calculateWinner(squares) {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let iWinningLine = 0; iWinningLine < winningLines.length; iWinningLine++) {
      const [a, b, c] = winningLines[iWinningLine];
      if (this.props.squares[a].symbol
          && this.props.squares[a].symbol !== this.neutralSymbol
          && this.props.squares[a].symbol === this.props.squares[b].symbol
          && this.props.squares[a].symbol === this.props.squares[c].symbol) {
        return this.props.squares[a].symbol;
      }
    }
  }*/
  
  handleClick(iSquare) {
    if (this.props.squares[iSquare].symbol === Game.neutralSymbol) {
      const squares = this.props.squares.slice();
      squares[iSquare] = this.props.currentPlayer;
//      this.setState({
//        squares: squares,
//      });

      this.props.switchPlayer();
    }
  }

  renderSquare(iSquare) {
    return (
      <Square
        onClick={() => this.handleClick(iSquare)}
        player = {this.props.squares[iSquare]}
      />
    );
  }

  render() {
//    const winner = this.calculateWinner(this.props.squares);
//    if (winner)
//      alert("Winner: " + winner);

    return (
      <div class="game-board">
        <div className="game-board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="game-board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="game-board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

//---------------------------------------------------------------------
// Game
//---------------------------------------------------------------------

class Game extends React.Component {
  static neutralSymbol = " ";

  constructor(props) {
    super(props);
    
    const neutralPlayer = new Player(Game.neutralSymbol, "LightGray");
    this.state = {
      history: [{
          squares: Array(9).fill(neutralPlayer),
        }],
      iCurrentPlayer: 0,
      players: [new Player('X', "Magenta"), new Player('O', "Orange")],
    }
  } 

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];

    return (
      <div className="game">
        <GameStatus
          currentPlayer={this.state.players[this.state.iCurrentPlayer]}
        />
        <Board
          currentPlayer={this.state.players[this.state.iCurrentPlayer]}
          squares={current.squares}
          switchPlayer={() => this.switchPlayer()}
        />
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }

  switchPlayer() {
    const iCurrentPlayer = (this.state.iCurrentPlayer + 1) % this.state.players.length;
    this.setState({
      iCurrentPlayer: iCurrentPlayer,
    })
  }
}

//---------------------------------------------------------------------
// GameStatus
//---------------------------------------------------------------------

class GameStatus extends React.Component {
  render() {
    return (
      <div className="game-status">
        <text>Current Player:&nbsp;</text>
        <text style={{color: this.props.currentPlayer.symbolColor}}>
            {this.props.currentPlayer.symbol}
        </text>
      </div>
    );
  }
}

//---------------------------------------------------------------------
// Player
//---------------------------------------------------------------------

class Player {
  constructor(symbol, symbolColor) {
    this.symbol = symbol;
    this.symbolColor = symbolColor;
  }
}

//---------------------------------------------------------------------
// Square
//---------------------------------------------------------------------

function Square(props) {
return (
    <button className="square" onClick={() => props.onClick()}>
      <text style={{color: props.player.symbolColor}}>
        {props.player.symbol}
      </text>
    </button>
  );
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
