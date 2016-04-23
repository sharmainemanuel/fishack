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
      // Asia 43.685831, 87.331157
      vLat =10.831727; vLong =106.625649;
      
      
      $.ajax({
        type: "GET",
        url: "http://m.weather.gov.ph/agaptest/keycities.php",
        async: false,
        success: function(myData){
          vDateIssued=myData.result.data[19].dateTime;
          for(var i = 0; i< 15; i++){
          arrCityName.push(myData.result.data[i].cityName);
          arrIcon.push("img/weather-icons/day" + myData.result.data[i].icon+".png");
          arrMinTemp.push(myData.result.data[i].min+"&degC");
          arrMaxTemp.push(myData.result.data[i].max+"&degC");}
        }
      });
      google.maps.event.addDomListener(window, 'load',initialize(vLat, vLong, 4));
    }
});


function initialize(vLat, vLong, vZoom)
{
  var arrLocations =[
    ['Australia', -33.870246, 151.199102],
    ['Brunei', 4.603432, 114.724919],
    ['Vietnam1', 10.831727, 106.625649],
    ['Myanmar', 16.868293, 96.199710],
    ['Cambodia', 11.551750, 104.872322],
    ['Vietnam2', 21.026859, 105.835418],
    ['Indonesia', -6.205837, 106.835686],
    ['Singapore', 1.356548, 103.856478],
    ['Malaysia', 3.137818, 101.686643],
    ['Thailand', 13.768463, 100.502600],
    ['China1', 22.295190, 114.186890],
    ['Taiwan', 25.035830, 121.565199],
    ['China2', 39.904844, 116.401540],
    ['South Korea', 37.556853, 126.992973],
    ['Japan', 35.725987, 139.730384]
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