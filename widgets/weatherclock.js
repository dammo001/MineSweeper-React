var WeatherClock = React.createClass({
  render: function() {

    return (
      <div>{this.state.time.toString()}<br/>
      {this.state.weather}
      </div>

  )
  },

  getInitialState: function() {
    return {
      time: new Date(),
      weather: this.findWeather()
    }
  },

  findWeather: function() {
    navigator.geolocation.getCurrentPosition(function(pos){
      var coords =  [pos.coords.latitude, pos.coords.longitude]
      var weather = this.ajaxRequest.call(this, coords);
    }.bind(this));
  },

  ajaxRequest: function(coords) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if(xmlhttp.status == 200){
              this.setState({weather: xmlhttp.responseText});
           }
           else if(xmlhttp.status == 400) {
              alert('There was an error 400')
           }
           else {
               alert('something else other than 200 was returned')
           }
        }
    }.bind(this)

    xmlhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?lat="+coords[0]+"&lon="+coords[1], true);
    xmlhttp.send();
  },




  componentDidMount: function() {
    this.clockId = setInterval(function(){this.setState({time: new Date()})}.bind(this), 10);


  },

  componentWillUnmount: function() {
    clearInterval(this.clockId);
  }


})
