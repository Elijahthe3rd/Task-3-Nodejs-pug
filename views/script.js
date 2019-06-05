var appId='9e20f7ab45d34e890c4a3a29ebf69ec1';
var units = 'metric';
var searchMethod;
 
function getsearchMethod(searchTerm){

if(searchTerm===5 && Number.parserInt(searchTerm)+""===searchTerm){
	searchMethod='zip'
}else{
	searchMethod='q'; 
}

}

function searchWearther(searchTerm){
	//call getSearchMethod
	getsearchMethod(searchTerm);
	//this api return info as json object
	fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result=>{
		return result.json();
	}).then(result=>{
		init(result)
	})
}

function init(serverResult){
	console.info(serverResult);
	switch(serverResult.weather[0].main){
		case 'Clear':
			document.body.style.backgroundImage=`url('clear.jpeg')`;
			break;

		case 'Clouds':
			document.body.style.backgroundImage=`url('cloud.jpeg')`;
			break;

		

		
		case 'Mist':
		document.body.style.backgroundImage=`url('Mist.jpeg')`;
			break;
		case 'Rain':
		case 'Light rain':
		case 'Drizzle':

			document.body.style.backgroundImage=`url('rain.jpeg')`;
			break;

		case 'Thunderstorm':
			document.body.style.backgroundImage=`url('storm.jpeg')`;
			break;

		case 'Snow':
			document.body.style.backgroundImage=`url('snow.jpeg')`;
			break;

	}
	//collecting Html Elements for future use/updates
	let weatherDescription=document.getElementById('weatherDescriptionHeader');
	let temperatureElement=document.getElementById('temperature');
	let humidityElement=document.getElementById('humidity');
	let windSpeedElement=document.getElementById('windSpeed');
	let cityHeader=document.getElementById('cityHead');
	let weatherIcon=document.getElementById('documentIconImg');

	//setting or populating HTML Elements with the collected weather API Data 
	weatherIcon.src='http://openweathermap.org/img/w/' + serverResult.weather[0].icon + '.png';
	let resultDescription=serverResult.weather[0].description;
	weatherDescriptionHeader.innerText=resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
	temperatureElement.innerHTML=Math.floor(serverResult.main.temp)+ '&#176';
	windSpeedElement.innerHTML=`Wind-Speed : ` + Math.floor(serverResult.wind.speed) + ` m/s`;
	cityHeader.innerHTML=serverResult.name;
	humidityElement.innerHTML='Humidity levels : ' + serverResult.main.humidity + '%';
}
//creating an event listener for button click
document.getElementById('searchBtn').addEventListener('click', () =>{
	let searchTerm=document.getElementById('searchInput').value;

	if(searchTerm)
		searchWearther(searchTerm);
})