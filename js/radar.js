var vLat=0;
var vLong=0;
var map;

var request;
var gettingData = false;
var aparriOverlay;
var subicOverlay;
var tagaytayOverlay;
var viracOverlay;
var cebuOverlay;
var iloiloOverlay;
var hinatuanOverlay;
var imageBounds = {north: 0, south: 0, east: 0, west: 0};
var vImageURL;


$(document).ready(function()
{
    //var scrheight = screen.height - (screen.height * .5);
    document.getElementById('map-canvas').style.width="100%";
    document.getElementById('map-canvas').style.height="100%";
    if (!navigator.geolocation) 
    {
      console.log("error in getting location");
    } else {
      // Philippines 12.330240, 122.231560
    vLat = 12.330240; vLong = 122.231560;
    google.maps.event.addDomListener(window, 'load',initialize(vLat, vLong, 5));
    }
});

function initialize(vLat, vLong, vZoom){
  var myMapStyle = setMyMapStyle();
  var mapReference = new google.maps.StyledMapType(myMapStyle, {name: "Styled Map"});
  var mapOptions = 
    {
      zoom: vZoom,
      center: new google.maps.LatLng(vLat, vLong),
      //mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
       mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, "map_style"]}
    };
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  map.mapTypes.set("map_style", mapReference);
  map.setMapTypeId("map_style");
}

function aparri(){
	vLat = 18.485172; vLong = 121.653905;
	imageBounds = {north:22.325, south:14.391667, east:125.775, west:117.475};
	

	if(document.getElementById("c1").checked == true){
		vImageURL = "http://121.96.11.155//gif//latestAPARRI.gif"; 
		aparriOverlay = new google.maps.GroundOverlay(vImageURL, imageBounds);
		aparriOverlay.setMap(map);}
	else {
		aparriOverlay.setMap(null); 
	}
}

function subic(){
	vLat = 14.8906534; vLong = 120.1035789; 
	imageBounds = {north:19.159373316082, south:10.483275363964, east:124.82251368207, west:115.90497960406};
	if(document.getElementById("c2").checked == true){
		vImageURL = "http://121.96.11.155//gif//latestSUB.gif";
		subicOverlay = new google.maps.GroundOverlay(vImageURL, imageBounds);
		subicOverlay.setMap(map);}
	else {
		subicOverlay.setMap(null); 
	}
}

function tagaytay(){
	vLat = 14.117350; vLong = 120.960433;
	imageBounds = {north:18.479648061224, south:9.8030511156703, east:125.46747687603, west:116.57695671772};

	if(document.getElementById("c3").checked == true){
		vImageURL= "http://121.96.11.155//gif//latestTAG.gif";
		tagaytayOverlay = new google.maps.GroundOverlay(vImageURL, imageBounds);
		tagaytayOverlay.setMap(map);}
	else {
		tagaytayOverlay.setMap(null); 
	}
}

function virac(){
	vLat = 13.586798; vLong = 124.207774; 
	  imageBounds = {north:17.6, south:9.658333, east:128.391667, west:120.275};

	if(document.getElementById("c4").checked == true){
		vImageURL = "http://121.96.11.155//gif//latestVIRAC.gif";
		viracOverlay = new google.maps.GroundOverlay(vImageURL, imageBounds);
		viracOverlay.setMap(map);}
	else {
		viracOverlay.setMap(null); 
	}
}

function cebu(){
	vLat = 10.314651; vLong =123.892288;
	  imageBounds = {north:14.661515657454, south:5.9825234198785, east:128.36230889744, west:119.59809454495};

	if(document.getElementById("c5").checked == true){
		vImageURL = "http://121.96.11.155//gif//latestCEB.gif";
		cebuOverlay = new google.maps.GroundOverlay(vImageURL, imageBounds);
		cebuOverlay.setMap(map);}
	else {
		cebuOverlay.setMap(null); 
	}
}

function iloilo(){
	vLat = 10.721607; vLong = 122.562612; 
	  imageBounds = {north:15.111704205242, south:6.4329576023395, east:126.96770508918, west:118.19078795281};

	if(document.getElementById("c6").checked == true){
		vImageURL = "http://api.meteopilipinas.gov.ph//tmp//d41d8cd98f00b204e9800998ecf8427e//latest-iloilo.gif";
		iloiloOverlay = new google.maps.GroundOverlay(vImageURL, imageBounds);
		iloiloOverlay.setMap(map);}
	else {
		iloiloOverlay.setMap(null); 
	}
}

function hinatuan(){
	vLat = 8.383376; vLong = 126.370973; 
	imageBounds = {north:12.706796434895, south:4.026854816938, east:130.69631945401, west:121.98068249912};

	if(document.getElementById("c7").checked == true){
		vImageURL = "http://121.96.11.155//gif//latestHIN.gif";
		hinatuanOverlay = new google.maps.GroundOverlay(vImageURL, imageBounds);
		hinatuanOverlay.setMap(map);}
	else {
		hinatuanOverlay.setMap(null); 
	}
}