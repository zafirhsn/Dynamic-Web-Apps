//	$(document).ready(function() {

//Get the array of spans with class fillData so we can put the data in here later 
let fillData = $(".fillIn");

//Get this heading sso we can put the state name in there
let fillState = $("h2");

//I'm going to make one request to the API and then store all the data I need into here
let stateData = {};

//	The API endpoint for 7 data points for every state in the U.S. in 2016
const url = 'https://api.datausa.io/api/?show=geo&sumlevel=state&required=pop,pop_rank,age,mean_commute_minutes,income,income_rank,median_property_value&year=latest'; 

//The first two indices of the array that contains the data has info that I don't need. The actual data I need starts at index 2, so I'll create this offset here so I can use it in a for loop later
const offset = 2;


//	The data I get back doesn't have the state's name anywhere, just a code. So here, create key/values pairs to match up the output of the SVG map with the data from the API
const stateMap = {
	AL: 0, AK: 1, AZ: 2, AR: 3, CA: 4, CO: 5, CT: 6, DE: 7, DC: 8, FL: 9, GA: 10, HI: 11, ID: 12, IL: 13, IN: 14, IA: 15, KS: 16, KY: 17, LA: 18, ME: 19, MD: 20, MA: 21, MI: 22, MN: 23, MS: 24,
	MO: 25, MT: 26, NE: 27, NV: 28, NH: 29, NJ: 30, NM: 31, NY: 32, NC: 33, ND: 34, OH: 35, OK: 36, OR: 37, PA: 38, RI: 39, SC: 40, SD: 41, TN: 42, TX: 43, UT: 44, VT: 45, VA: 46, WA: 47, WV: 48,
	WI: 49, WY: 50
};

//	One request, save the data in a var
fetch(url).then(function(response) {
	response.json().then(function(data) {	
		stateData = data;
		console.log(stateData);
	});
});


//		Draw the map
$('#map').usmap({

//			Map styles
	'stateStyles': {
		fill: '#c4c4c4',
		stroke: "#000",
		"stroke-width": 0.4
	}, 

	'stateHoverStyles': {
		fill: '#4e0570',
		stroke: '#4e0570'

	},
	'labelBackingStyles': {
		fill: "#a5a5a5",
		"stroke-linejoin": "round"
	},

	'labelBackingHoverStyles': {
		fill: '#4e0570',
		stroke: "#ADCC56"
	},

	'labelTextStyles': {
		fill: "#fff",
		'font-weight': 300,
		'font-size': '10px'
	},

	stateHoverAnimation: 100,


	click: function(event, data) {
//		Loop through the array of spans, fill in the data
		for(let i = 0; i < fillData.length; i++) {
			fillData[i].innerHTML = " " + stateData.data[stateMap[data.name]][i+offset];
		}	
//		put the state's abbreviation on top
		fillState[0].innerHTML =  data.name;

	}

});