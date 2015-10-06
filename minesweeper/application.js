/* global React */

var Game = React.createClass({
  getInitialState: function() {

    return {
      board: new window.Minesweeper.Board(10,10),
      gameOver: false,
      gameWon: false
    };
  },

  updateGame: function(moveType, pos) {
    if(this.state.gameOver) { return; }
    if (moveType === "flag"){
      this.state.board.grid[pos[0]][pos[1]].toggleFlag();
    }
    else {
      this.state.board.grid[pos[0]][pos[1]].explore();
    }
    this.checkGameOver();
    // this.forceUpdate();
  },

  checkGameOver: function() {
    if(this.state.board.won()) {
      alert("You win!");
      this.setState({gameOver: true});
    }else if (this.state.board.lost()) {
      alert("You Lose!");
      this.setState({gameOver: true});
    } else {
      this.setState({gameOver: false});
    }
  },

  render: function () {
    return (
      <Board board={this.state.board} updateGame={this.updateGame}/>
    );
  }
});

var Board = React.createClass({
  render: function() {
    return (
      <ul className="board">
      {this.props.board.grid.map(function(row, rowIdx){
        return (<div className="row" key={rowIdx}> {row.map(function(tile, colIdx){
          return <Tile pos={[rowIdx, colIdx]} updateGame={this.props.updateGame} board={this.props.board}/>;}.bind(this))}
          </div>);
        }.bind(this))
      }
      </ul>
    );
  }
});


var Tile = React.createClass({
  getInitialState: function() {
    return {
      value: "T",
      tileType: 'hidden'
    };
  },


  toString: function() {
    var tile = this.props.board.grid[this.props.pos[0]][this.props.pos[1]];
    if(tile.bombed && tile.explored) {
      this.state.value = '💣';
      this.state.tileType = "bombed";
    }else if(tile.flagged) {
      this.state.value = '\u2691';
      this.state.tileType = "flagged";
    }else if (tile.explored === false) {
      this.state.value = "";
    }else{
      this.state.tileType = "revealed";
      this.state.value = tile.adjacentBombCount();
    }
  },

  handleClick: function(e) {
    if (e.altKey){
      this.props.updateGame("flag", this.props.pos);
    }
    else {
      this.props.updateGame("notFlag", this.props.pos);
    }
  },

  render: function(){
    this.toString();
    return ( <li
        className={'tile ' + this.state.tileType}
        onClick={this.handleClick}
        key={this.props.pos}>
        {this.state.value}
        </li> );
  }});
