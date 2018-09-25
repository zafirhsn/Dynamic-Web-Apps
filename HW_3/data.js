// Get the dropdown from the DOM by id so we can detect changes
var city = document.querySelector('#location');
// get the empty p tags where I'll put in the highs and lows for each day, take by tag so I can iterate through the node list
var weather = document.getElementsByTagName("p");

console.log(weather);
  
  // When the city changes, update the highs and lows
  city.onchange = function() {
  	var cityURL = city.value;
    console.log(city.value);
    updateDisplay(cityURL);
  };
  
  function updateDisplay(cityURL) {
    // complete the url using the value from the dropdown and fetch the data
  	var url = 'http://api.wunderground.com/api/82b6cd80a08334b5/forecast/q/' + cityURL + '.json'
    console.log(url);
    
    // fetch data, take response 
    fetch(url).then(function(response) {
    // response ok, the actual data is in the body, well do .json() so we can get to the stream 
		response.json().then(function(data) {
      // In the stream, loop thru days and fill up p tags
			console.log(data);
			for (var i = 0; i < weather.length; i++) {
				weather[i].innerHTML = data.forecast.simpleforecast.forecastday[i].date.weekday + "<br> High: " + data.forecast.simpleforecast.forecastday[i].high.fahrenheit + "<br> Low: " + data.forecast.simpleforecast.forecastday[i].low.fahrenheit ;
			}
		});
	
	});
  
  }  