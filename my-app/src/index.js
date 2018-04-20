import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//---------------------------------------------------------------------
// Board
//---------------------------------------------------------------------

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(new Player("@", "LightGray")),
    };
  }

  handleClick(iSquare) {
    const squares = this.state.squares.slice();
    squares[iSquare] = this.props.currentPlayer;
    this.setState({
      squares: squares,
    });

    this.props.switchPlayer();
  }

  renderSquare(iSquare) {
    return (
      <Square
        onClick={() => this.handleClick(iSquare)}
        player = {this.state.squares[iSquare]}
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
  constructor(props) {
    super(props);
    
    this.state = {
      iCurrentPlayer: 0,
      players: [new Player('X', "Magenta"), new Player('O', "Orange")],
    }
  } 

  render() {
    return (
      <div className="game">
        <GameStatus
          currentPlayer={this.state.players[this.state.iCurrentPlayer]}
        />
        <Board
          currentPlayer={this.state.players[this.state.iCurrentPlayer]}
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
