var vLat=0, vLong=0;
var map;
var radarOverlay;
var imageBounds = {north: 0, south: 0, east: 0, west: 0};
var vImageURL;
var arrCityName=[]; arrCrime=[], arrDate=[];
var arrIcon1=[], arrMin1=[], arrMax1=[];
var arrIcon2=[], arrMin2=[], arrMax2=[];
var arrIcon3=[], arrMin3=[], arrMax3=[];
var arrIcon4=[], arrMin4=[], arrMax4=[];
var arrIcon5=[], arrMin5=[], arrMax5=[];
var vDateIssued;




$(document).ready(function()
{

    document.getElementById('map-canvas').style.width="100%";
    document.getElementById('map-canvas').style.height="100%"; //scrheight + "px";
    if (!navigator.geolocation) 
    {
      console.log("error in getting location");
    } else {
      vLat = 12.330240; vLong = 122.231560;
      
         google.maps.event.addDomListener(window, 'load',initialize(vLat, vLong, 6));

   
    }
});


function initialize(vLat, vLong, vZoom)
{
 var arrLocations =[
    ['Zamboanga', 0, 0],
    ['Metro Davao', 7.100497, 125.608841]
  ];
  vImageURL = "img/weather-icons/partly_cloudy_skies.png";
  var myMapStyle = setMyMapStyle();
  var mapReference = new google.maps.StyledMapType(myMapStyle, {name: "Styled Map"});
  var mapOptions = 
    {
      zoom: vZoom,
      center: new google.maps.LatLng(vLat, vLong),
      disableDefaultUI: true,
      mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, "map_style"]}
    };
  var positionstring;
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  map.mapTypes.set("map_style", mapReference);
  map.setMapTypeId("map_style");

  var infowindow = new google.maps.InfoWindow();
  var marker, i;

        $.ajax({
        type: "GET",
        url: "http://iligtas.ph/FishSOS/reports.php",
        async: false,
        success: function(myData){
			
  for(i=0; i<myData.length; i++)
  {
	  arrCityName.push(myData[i].image);
	  arrDate.push(myData[i].uploaddate);
					switch(myData[i].crime){
					case "license": arrCrime[i]='Fishing without Licence'; arrIcon1[i] = 'crime_icon_1';  break;
					case "prohibited": arrCrime[i]='Fishing of prohibited species'; arrIcon1[i] = 'crime_icon_2';  break;
					case "gear": arrCrime[i]='Fishing with the use of prohibited gear'; arrIcon1[i] = 'crime_icon_3';  break;
					case "superlight": arrCrime[i]='Use of Superlight'; arrIcon1[i] = 'crime_icon_4';  break;
					case "tampering": arrCrime[i]='International tampering with the vessel monitoring system'; arrIcon1[i] = 'crime_icon_5';  break;
					
					}
	  
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(myData[i].lat,myData[i].lon),
      map:map,
	  animation: google.maps.Animation.BOUNCE,
      icon: "img/"+arrIcon1[i]+".png"
    });
	
	
	

    google.maps.event.addListener(marker, 'click', (function(marker, i){

    return function(){
      var vLayout = "<img src='"+arrCityName[i]+"' class='dataMap'><br><strong>Issued Report:</strong> "+arrCrime[i]+"<br><strong>Issued Date: </strong>"+arrDate[i]+"";
      infowindow.setContent(vLayout);
      infowindow.open(map, marker);
    }
  })(marker, i));
  }
		}
		
		});	
}