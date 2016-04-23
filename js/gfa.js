			$(document).ready(function(){
		$.ajax
({

  type: "GET",
  url: "http://m.weather.gov.ph/agaptest/gfa.php",
  async: false,

  success: function (result2){
	setTimeout(function(){
		$('#imgLoader').fadeOut();
 	var info = result2.result['26f22ef9-c7af-4474-b3a1-85dd44a74ba6'].info.event;
 	var responseType = result2.result['26f22ef9-c7af-4474-b3a1-85dd44a74ba6'].info.responseType;
 	var urgency = result2.result['26f22ef9-c7af-4474-b3a1-85dd44a74ba6'].info.urgency;
 	var severity = result2.result['26f22ef9-c7af-4474-b3a1-85dd44a74ba6'].info.severity;
 	var certainty = result2.result['26f22ef9-c7af-4474-b3a1-85dd44a74ba6'].info.certainty;
 	var expires = result2.result['26f22ef9-c7af-4474-b3a1-85dd44a74ba6'].info.expires;
 	var headline = result2.result['26f22ef9-c7af-4474-b3a1-85dd44a74ba6'].info.headline;
 	var description = result2.result['26f22ef9-c7af-4474-b3a1-85dd44a74ba6'].info.description;
	
	$( ".inner" ).html("<p><span>Event</span>: <br>"+info+"</p><p><span>Response Type: </span><br>"+responseType+"</p><p><span>Urgency:</span> <br>"+severity+"</p><p><span>Certainty: </span><br>" +certainty+"</p><p><span>Expiries: </span><br>" +expires+"</p><p><span>Headline: </span><br>" +headline+"</p><p><span>Description: </span><br>" +description+"</p>");
	 }, 1000);
	},  error: function (request, textStatus, errorThrown) {
        //console.log(request.responseText);
        console.log(textStatus);
        console.log(errorThrown);
    }
});
});