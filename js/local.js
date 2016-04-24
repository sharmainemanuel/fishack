var vLat=0, vLong=0;
var map;
var radarOverlay;
var imageBounds = {north: 0, south: 0, east: 0, west: 0};
var vImageURL;
var arrCityName=[], arrIcon=[], arrMinTemp=[], arrMaxTemp=[];
var vDateIssued;
var arrLocations=[];

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
        url: "http://iligtas.ph/FishSOS/explosion.php",
        async: false,
        success: function(m){
       	vDateIssued=m[0].timestamp;
       	arrLocations.push([m[0].locname, m[0].lat, m[0].lon]);
       	console.log(arrLocations[0][1]);
       	console.log(arrLocations[0][2]);
       	vLat = arrLocations[0][1];
       	vLong = arrLocations[0][2];


        }
      });
      google.maps.event.addDomListener(window, 'load',initialize(vLat, vLong, 8));
    }
});


function initialize(vLat, vLong, vZoom)
{
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

  for(i=0; i<arrLocations.length; i++)
  {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(vLat,vLong),
	  animation: google.maps.Animation.BOUNCE,
      map:map,
      icon: 'img/alert_icon.png'
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i){
    return function(){
      infowindow.setContent("<h3<img src='img/alert_icon.png'><strong>"+arrLocations[0][0]+"</strong></h3><p style='color: red'>There is a possible illegal fishing activity in this area.Location: "+vLat+","+vLong+"</p><p style='text-align:right !important; text-color:gray; font-size:small; font-style:italic'>Date Issued: "+vDateIssued+"</p>");
      infowindow.open(map, marker);
    }
  })(marker, i));
  }
}