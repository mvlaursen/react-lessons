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
// Player
//---------------------------------------------------------------------

class Player {
  constructor(symbol, symbolColor) {
    this.symbol = symbol;
    this.symbolColor = symbolColor;
  }
}

//---------------------------------------------------------------------
// Game
//---------------------------------------------------------------------

class Game extends React.Component {
  static neutralPlayer = new Player(" ", "LightGray");
  static players = [new Player('X', "Magenta"), new Player('O', "Orange")];

  constructor(props) {
    super(props);
    
    this.state = {
      moves: [{
        bDidWin: false,
        iPlayerThatMoved: -1,
        squares: Array(9).fill(Game.neutralPlayer),
      }],
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
          && squares[a].symbol !== Game.neutralPlayer.symbol
          && squares[a].symbol === squares[b].symbol
          && squares[a].symbol === squares[c].symbol) {
        return true;
      }
    }

    return false;
  }
  
  handleClick(iSquare) {
    const movesClone = this.state.moves;
    const lastMove = movesClone[movesClone.length - 1];
    const iCurrentPlayer = (lastMove.iPlayerThatMoved + 1) % Game.players.length;
    const squares = lastMove.squares.slice();

    if (!lastMove.bDidWin && squares[iSquare].symbol === Game.neutralPlayer.symbol) {
      squares[iSquare] = Game.players[iCurrentPlayer];

      this.setState(
        {
          moves: movesClone.concat({
            bDidWin: this.calculateWinner(squares),
            iPlayerThatMoved: iCurrentPlayer,
            squares: squares,
          }),
        }
      )
    }
  }

  jumpTo(iMove) {
    const moves = this.state.moves.slice(0, iMove + 1);

    this.setState({
      moves: moves,
    });
  }
  
  render() {
    const lastMove = this.state.moves[this.state.moves.length - 1];
    const currentPlayer = Game.players[(lastMove.iPlayerThatMoved + 1) % Game.players.length];

    const movesButtons = this.state.moves.map((move, iMove) => {
      const desc = iMove ?
        Game.players[move.iPlayerThatMoved].symbol + " moved." :
        "Start of game";
        return (
          <li key={iMove}>
            <button onClick={() => this.jumpTo(iMove)}>{desc}</button>
          </li>
        )
    });
    
    return (
      <div className="game">
        <GameStatus
          bDidWin={lastMove.bDidWin}
          lastMovePlayer={Game.players[(lastMove.iPlayerThatMoved + 1) % Game.players.length]}
        />
        <Board
          lastMovePlayer={currentPlayer}
          onClick={(iSquare) => this.handleClick(iSquare)}
          squares={lastMove.squares}
          switchPlayer={() => this.switchPlayer()}
        />
        <div className="game-info">
          <ol>{movesButtons}</ol>
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
      const lastMovePlayer = this.props.lastMovePlayer;
      var symbol = lastMovePlayer.symbol;
      var symbolColor = lastMovePlayer.symbolColor;
      
      if (this.props.bDidWin) {
        label = "Loser";
        symbol = this.props.lastMovePlayer.symbol;
        symbolColor = this.props.lastMovePlayer.symbolColor;
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
