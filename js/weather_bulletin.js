$.ajax
({
  type: "GET",
  url: "http://m.weather.gov.ph/agaptest/weather_bulletin.php",
  async: false,
  success: function (result2){
	  setTimeout(function(){$("#imgLoader").fadeOut();
	  var bulletin = result2.result.length;
	  	for(j=0; j<=result2.result.length; j++){
			if (bulletin == ""){
				$(".inner").html("As of today, there is no tropical cyclone within the Philippine Area of Responsibility (PAR)");
			}
		}
	  });
	}
});

