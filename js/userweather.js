var vLat=0, vLong=0;
var map;
var radarOverlay;
var imageBounds = {north: 0, south: 0, east: 0, west: 0};
var vImageURL;
var arrCityName=[]; arrWindStr=[], arrWindDir=[];
var arrIcon1=[], arrMin1=[], arrMax1=[];
var arrIcon2=[], arrMin2=[], arrMax2=[];
var arrIcon3=[], arrMin3=[], arrMax3=[];
var arrIcon4=[], arrMin4=[], arrMax4=[];
var arrIcon5=[], arrMin5=[], arrMax5=[];
var vDateIssued;

$(document).ready(function()
{
    //var scrheight = screen.height - (screen.height * .5);
    document.getElementById('map-canvas').style.width="100%";
    document.getElementById('map-canvas').style.height="100%"; //scrheight + "px";
    if (!navigator.geolocation) 
    {
      console.log("error in getting location");
    } else {
      // Philippines 12.330240, 122.231560
      vLat = 12.330240; vLong = 122.231560;
      
      
      $.ajax({
        type: "GET",
        url: "http://iligtas.ph/FishSOS/reports.php",
        async: false,
        success: function(myData){

            setTimeout(function(){
    $('#imgLoader').fadeOut();

          for(var i = 0; i < myData.length; i++){
			  console.log(myData.length);
			arrCityName.push(myData[i].image);
	
        }

   google.maps.event.addDomListener(window, 'load',initialize(vLat, vLong, 6));
        
     }, 500);
      }
      });
   
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
      //mapTypeId: google.maps.MapTypeId.HYBRID,
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
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(myData[i].lat,myData[i].lon),
      map:map,
      icon: arrIcon1[i]
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i){
    return function(){
      var vLayout = "<img src='"+arrCityName[i]+"'>";
      infowindow.setContent(vLayout);
      infowindow.open(map, marker);
    }
  })(marker, i));
  }
		}
		
		});	
}