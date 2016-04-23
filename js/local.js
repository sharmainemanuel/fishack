var vLat=0, vLong=0;
var map;
var radarOverlay;
var imageBounds = {north: 0, south: 0, east: 0, west: 0};
var vImageURL;
var arrCityName=[], arrIcon=[], arrMinTemp=[], arrMaxTemp=[];
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
        url: "http://m.weather.gov.ph/agaptest/	keycities.php",
        async: false,
        success: function(myData){
          vDateIssued=myData.result.data[19].dateTime;
          for(var i = 0; i + 18 < 30; i++){
          arrCityName.push(myData.result.data[i+18].cityName);
          arrIcon.push("img/weather-icons/day" + myData.result.data[i+18].icon+".png");
          arrMinTemp.push(myData.result.data[i+18].min+"&degC");
          arrMaxTemp.push(myData.result.data[i+18].max+"&degC");}
        }
      });
      google.maps.event.addDomListener(window, 'load',initialize(vLat, vLong, 6));
    }
});


function initialize(vLat, vLong, vZoom)
{
  var arrLocations =[
    ['Kidapawan', 6.981397,125.0374493],
    ['Dipolog', 8.5010721,123.2507508],
    ['General Santos', 6.137895,125.0174282],
    ['Surigao', 9.7959653,125.4428754],
    ['Bohol', 9.8715162,123.8893529],
    ['Catbalogan', 11.800823,124.7413688],
    ['Boracay', 11.9693649,121.8922094],
    ['Roxas', 11.5476108,122.668642],
    ['Dumaguete', 9.2958166,123.2466886],
    ['Kalayaan', 10.4420269,118.6169688],
    ['Calapan', 14.6412603,121.0525372],
    ['Cabanatuan', 15.5000569,120.9109841]
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

  for(i=0; i<arrLocations.length; i++)
  {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(arrLocations[i][1], arrLocations[i][2]),
      map:map,
      icon: arrIcon[i]
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i){
    return function(){
      infowindow.setContent("<table><td><img src='"+arrIcon[i]+"' alt='' /></td><td><strong>"+arrCityName[i]+"</strong><br /><span>Temperature: Min: "+arrMinTemp[i]+"; Max: "+arrMaxTemp[i]+"</span></td></table>"+"<p style='text-align:right !important; text-color:gray; font-size:small; font-style:italic'>Date Issued: "+vDateIssued+"</p>");
      infowindow.open(map, marker);
    }
  })(marker, i));
  }
}