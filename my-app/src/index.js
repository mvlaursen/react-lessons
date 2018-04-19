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
      squares: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  }

  handleClick(iSquare) {
    const squares = this.state.squares.slice();
    squares[iSquare] = this.props.currentPlayerSymbol;
    this.setState({
      squares: squares,
    });
  }

  renderSquare(iSquare) {
    return (
      <Square
        onClick={() => this.handleClick(iSquare)}
        playerSymbol = {this.state.squares[iSquare]}
        playerSymbolColor = {this.props.currentPlayerSymbolColor}
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
      iPlayer: 0,
      players: [new Player('X', "Magenta"), new Player('O', "Orange")],
    }
  } 

  render() {
    return (
      <div className="game">
        <GameStatus
          currentPlayerSymbol={this.state.players[this.state.iPlayer].playerSymbol}
          currentPlayerSymbolColor={this.state.players[this.state.iPlayer].playerSymbolColor}
        />
        <Board
          currentPlayerSymbol={this.state.players[this.state.iPlayer].playerSymbol}
          currentPlayerSymbolColor={this.state.players[this.state.iPlayer].playerSymbolColor}
        />
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }

  switchPlayer() {
    this.setState({
      iPlayer: (this.state.iPlayer + 1) % this.state.players.length,
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
        <text style={{color: this.props.currentPlayerSymbolColor}}>
            {this.props.currentPlayerSymbol}
        </text>
      </div>
    );
  }
}

//---------------------------------------------------------------------
// Player
//---------------------------------------------------------------------

class Player {
  constructor(playerSymbol, playerSymbolColor) {
    this.playerSymbol = playerSymbol;
    this.playerSymbolColor = playerSymbolColor;
  }
}

//---------------------------------------------------------------------
// Square
//---------------------------------------------------------------------

function Square(props) {
return (
    <button className="square" onClick={() => props.onClick()}>
      <text style={{color: props.playerSymbolColor}}>
        {props.playerSymbol}
      </text>
    </button>
  );
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
