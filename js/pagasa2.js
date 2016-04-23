$(document).ready(function(){
	getLocation();  
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
			console.log("get location");
    } else { 
        x.innerHTML = "please check your GPS.";
		console.log("error in getting location");
    }
}


function showPosition(position) {
	var lat =position.coords.latitude ;
	var lon =position.coords.longitude ;

	
	var locationLinkDaily = "http://api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon="+ lon +"&APPID=f409ef9bff7e0ac91c9f4074b3945a26&units=metric";
	var locationLinkForecast = "http://api.openweathermap.org/data/2.5/forecast/daily?lat="+ lat +"&lon="+ lon +"&APPID=f409ef9bff7e0ac91c9f4074b3945a26&units=metric";

$.ajax({
            url: locationLinkDaily, 
            type: "GET",   
            dataType: 'jsonp',
            cache: false,
            success: function(result){                          
				var description = result.weather[0].description;
				var icon = result.weather[0].icon;
				if(icon=='03d'){
					icon='cloudy_skies';
				}
				var temp = Math.round(result.main.temp);
				var name = 	result.name;
				 
				setTimeout(function(){
					$('#imgLoader').fadeOut();
					$('#imgLoader2').fadeOut();
								
					document.getElementById('showHome').innerHTML = "<div class='card-media'><img width='100%' src='img/weather_icons/"+ icon  + ".png'></div><div class='card-title'><h3 class='card-primary-title'>"+temp + "&#176;C <br>"+ name + "</h3>	<h5 class='card-subtitle'>"+description+"</h5><hr></div>";
		
					
				}, 3000);	
            }           
        });        

$.ajax({
            url: locationLinkForecast, 
            type: "GET",   
            dataType: 'jsonp',
            cache: false,
            success: function(result){                          
				for (var i = 1; i < 5; i++) {
					var dt = result.list[i].dt;
					var time = new Date(dt*1000);
					var date = new Date(time);
					var daily = date.customFormat( "#DDD#");
					var min = Math.round(result.list[i].temp.min);
					var max = Math.round(result.list[i].temp.max);
					var icon = result.list[i].weather[0].icon;
if(icon=='10d'){
						icon='partly_cloudy_skies_with_isolated_rainshowers';
					}
					else if(icon=='01d'){
						icon='sunny';
					}
					$("#showDailyHome").append("<div class='col-md-3 col-xs-3'><div class='classWithPad'>"+daily+"<br><img width='100%' class='wIcon' src='img/weather_icons/"+ icon  + ".png'><strong>"+max + "&deg; </strong><br>" +min+"&deg;<br><br></div></div>");   
					
				}		
            }           
        });        
}




});
		








