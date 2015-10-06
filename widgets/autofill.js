
var Autocomplete = React.createClass({

  getInitialState: function(){
    debugger;
    return {searchList: this.props.names, searchString: ""};
  },

  autofill: function(name){
    this.setState({searchString: name});
  },

  updateList: function(e){
    var filterList = (function(){
      return this.props.names.filter(function(name){
        var nameStart = name.slice(0, e.target.value.length);
        return (e.target.value === nameStart);
      }.bind(this));
    }).bind(this);
  this.setState({searchList: filterList(), searchString: e.target.value});
  },

  render: function(){
    return (
      <div>
        <input type="text" className="input" value={this.state.searchString} onInput={this.updateList}></input>
        <SearchList autofill={this.autofill} names={this.state.searchList}/>
      </div>
    );
  }
});

var SearchList = React.createClass({
    render: function(){
      return(
        <ul>
          {this.props.names.map(function(name) {
            return <li onClick={this.props.autofill.bind(this, name)} key={name}>{name}</li>
          }.bind(this))}
        </ul>
      );
    }
});
