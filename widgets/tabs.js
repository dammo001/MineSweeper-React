var Tabs = React.createClass({
  getInitialState: function() {
    return {content: [{title: "Tab1", text: "text 1" + this.loremIpsum()},
              {title: "Tab2", text: "text 2" + this.loremIpsum()},
              {title: "Tab3", text: "text 3" + this.loremIpsum()}],
            activeTab: 0
    };
  },

  render: function() {
    return(
      <div>
        <ul>
          {this.state.content.map(this.createLinks.bind(this))}
        </ul>
        <p>{this.state.content[this.state.activeTab].text}</p>
      </div>
    )
  },

  clickTab: function(idx, e) {
    this.setState({activeTab: idx})
  },


  createLinks: function(tab, index) {
    if (index === this.state.activeTab){
      return (<li key={index} onClick={this.clickTab.bind(this, index)}><strong>{tab.title}</strong></li>);
    } else {
      return (<li key={index} onClick={this.clickTab.bind(this, index)}>{tab.title}</li>);
    }
  },

  loremIpsum: function() {
    return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a aliquam erat. Fusce lacinia lorem eget facilisis finibus. Praesent ut dapibus nulla, sit amet ornare turpis. Ut sed laoreet ante, quis luctus lacus. Curabitur maximus pellentesque erat eu sagittis. Nulla elementum sit amet dolor id fringilla. Sed eget risus rhoncus, hendrerit libero nec, congue leo. Nulla tincidunt convallis eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ullamcorper sapien. Vestibulum imperdiet sed ligula sit amet porttitor. Vivamus porta diam congue tellus fringilla porta. Sed cursus sagittis lacus in interdum."
  }



})
