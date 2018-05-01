import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//---------------------------------------------------------------------
// Board
//---------------------------------------------------------------------

class Board extends React.Component {
  renderSquare(iSquare) {
    return (
      <Square
        onClick={() => this.props.onClick(iSquare)}
        player = {this.props.squares[iSquare]}
      />
    );
  }

  render() {
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
      iCurrentMove: 0,
      iCurrentPlayer: 0,
      players: [new Player('X', "Magenta"), new Player('O', "Orange")],
    }
  } 

  calculateWinner(squares) {
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
      if (squares[a].symbol
          && squares[a].symbol !== Game.neutralSymbol
          && squares[a].symbol === squares[b].symbol
          && squares[a].symbol === squares[c].symbol) {
        return squares[a];
      }
    }
  }
  
  handleClick(iSquare) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (squares[iSquare].symbol === Game.neutralSymbol) {
      squares[iSquare] = this.state.players[this.state.iCurrentPlayer];
      const players = this.state.players.slice();

      this.setState(
        {
          history: history.concat({
            squares: squares,
          }),
          iCurrentMove: this.state.iCurrentMove + 1,
          iCurrentPlayer: (this.state.iCurrentPlayer + 1) % this.state.players.length,
          players: players,
        }
      )
    }
  }

  jumpTo(iMove) {
    this.setState({
      iCurrentMove: iMove,
      iCurrentPlayer: 0, // Not right.
    });
  }
  
  render() {
    const history = this.state.history;
    const current = history[this.state.iCurrentMove];
    const winner = this.calculateWinner(current.squares);

    const moves = history.map((move, iMove) => {
      const desc = iMove ?
        'Go to move #' + iMove :
        'Go to game start';
        return (
          <li key={iMove}>
            <button onClick={() => this.jumpTo(iMove)}>{desc}</button>
          </li>
        )
    });
    
    return (
      <div className="game">
        <GameStatus
          currentPlayer={this.state.players[this.state.iCurrentPlayer]}
          winner={winner}
        />
        <Board
          currentPlayer={this.state.players[this.state.iCurrentPlayer]}
          onClick={(iSquare) => this.handleClick(iSquare)}
          squares={current.squares}
          switchPlayer={() => this.switchPlayer()}
        />
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

//---------------------------------------------------------------------
// GameStatus
//---------------------------------------------------------------------

class GameStatus extends React.Component {
  render() {
      var label = "Current Player";
      var symbol = this.props.currentPlayer.symbol;
      var symbolColor = this.props.currentPlayer.symbolColor;
      
      if (this.props.winner) {
        label = "Winner";
        symbol = this.props.winner.symbol;
        symbolColor = this.props.winner.symbolColor;
      }

      return (
      <div className="game-status">
        <text>{label}:&nbsp;</text>
        <text style={{color: symbolColor}}>
            {symbol}
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
