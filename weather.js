// appID = 77cf3d51c103f4df06051af2e64731a6


var submitOne = document.getElementById("firstSubmit");
var submitTwo = document.getElementById("secondSubmit");

submitOne.addEventListener("click", function(){
	var firstChar = document.getElementById("location").value.charAt(0);
	if( firstChar <='9' && firstChar >='0') {
      	api = "https://api.openweathermap.org/data/2.5/weather?zip=" + document.getElementById("location").value + "," + document.getElementById("country").value + "&appid=77cf3d51c103f4df06051af2e64731a6&units=imperial"
		getWeather(api);
}
	else{
		api = "http://api.openweathermap.org/data/2.5/weather?q=" + document.getElementById("location").value + "," + document.getElementById("country").value + "&appid=77cf3d51c103f4df06051af2e64731a6&units=imperial"
		getWeather(api);
	}
});

function getWeather(api){
	var req = new XMLHttpRequest();
	req.open("GET", api, true);
	req.addEventListener('load',function(){
		if(req.status >= 200 && req.status < 400){
	        var data = JSON.parse(req.responseText);
			var temp = data.main.temp;
			var city = data.name;
			var humidity = data.main.humidity
			var country = data.sys.country;
			var outputString = "The current temperature in " + city + ", " + country + " is " + temp + " °F and the humidity is " + humidity + "%."
			var output = document.getElementsByTagName("div")[0];
			output.textContent = outputString;
	      } else {
	        console.log("Error in network request: " + req.statusText);
	      }});
	req.send(null);
	event.preventDefault();	
}

submitTwo.addEventListener("click", function(){
	var req = new XMLHttpRequest();
	var data = {username:document.getElementById("username").value, password: document.getElementById("password").value} 
	req.open('POST', 'http://httpbin.org/post', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
	    var responseObj = JSON.parse(response.data);
	    var usernameOutput = Object.keys(responseObj)[0] + ":" + responseObj.username
	    var passwordOutput = Object.keys(responseObj)[1] + ":" + responseObj.password
	    var usernameResponse = document.getElementById("usernameResponse");
	    var passwordResponse = document.getElementById("passwordResponse");
	    usernameResponse.textContent = usernameOutput;
	    passwordResponse.textContent = passwordOutput;
	 }
      	else {
        console.log("Error in network request: " + req.statusText);
      }});
    req.send(JSON.stringify(data));  
    event.preventDefault();
});