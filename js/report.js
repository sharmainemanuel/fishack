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
        url: "http://iligtas.ph/agaptest/outlook.php",
        async: false,
        success: function(myData){
          console.log(myData);
          for(var i = 0; i < 16; i++){
          arrCityName.push(myData.result.data[i].cityName);
          arrWindStr.push(myData.result.data[i].windStr);
          arrWindDir.push(myData.result.data[i].windDir);

          //first info
          arrIcon1.push("img/weather-icons/day" + myData.result.data[i].day1.logo + ".png");
          arrMin1.push(myData.result.data[i].day1.min);
          arrMax1.push(myData.result.data[i].day1.max);

          //second info
          arrIcon2.push("img/weather-icons/day" + myData.result.data[i].day2.logo + ".png");
          arrMin2.push(myData.result.data[i].day2.min);
          arrMax2.push(myData.result.data[i].day2.max);

          //third info
          arrIcon3.push("img/weather-icons/day" + myData.result.data[i].day3.logo + ".png");
          arrMin3.push(myData.result.data[i].day3.min);
          arrMax3.push(myData.result.data[i].day3.max);

          //fourth info
          arrIcon4.push("img/weather-icons/day" + myData.result.data[i].day4.logo + ".png");
          arrMin4.push(myData.result.data[i].day4.min);
          arrMax4.push(myData.result.data[i].day4.max);

          //fifth info
          arrIcon5.push("img/weather-icons/day" + myData.result.data[i].day5.logo + ".png");
          arrMin5.push(myData.result.data[i].day5.min);
          arrMax5.push(myData.result.data[i].day5.max);
          
        }}
      });
      navigator.geolocation.getCurrentPosition(function(position){
      vLat=position.coords.latitude; 
      vLong=position.coords.longitude;
      console.log(vLat + ", " + vLong);
       google.maps.event.addDomListener(window, 'load',initialize(vLat, vLong, 10));
    });
      //google.maps.event.addDomListener(window, 'load',initialize(vLat, vLong, 6));
    }
});


function initialize(vLat, vLong, vZoom)
{
 var arrLocations =[
    ['Zamboanga', 6.916228, 122.069782],
    ['Metro Davao', 7.100497, 125.608841],
    ['Valencia City', 7.865434, 125.169273],
    ['Cagayan De Oro', 8.456392, 124.627907],
    ['Tacloban City', 11.255724, 124.950940],
    ['Metro Manila', 14.5655922,120.8845468]
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
      icon: arrIcon1[i]
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i){
    return function(){
      var vLayout = "<table border='1'><tr><td colspan='5'><strong>"+arrCityName[i]+"</strong><br />Wind Strenght: "+arrWindStr[i]+"<br />Wind Direction: "+arrWindDir[i]+"</td></tr>";
      vLayout += "<td><img src="+arrIcon1[i]+"><br /><span>"+arrMin1[i]+" - "+arrMax1[i]+"&degC</span></td>";
      vLayout += "<td><img src="+arrIcon2[i]+"><br /><span>"+arrMin2[i]+" - "+arrMax2[i]+"&degC</span></td>";
      vLayout += "<td><img src="+arrIcon3[i]+"><br /><span>"+arrMin3[i]+" - "+arrMax3[i]+"&degC</span></td>";
      vLayout += "<td><img src="+arrIcon4[i]+"><br /><span>"+arrMin4[i]+" - "+arrMax4[i]+"&degC</span></td>";
      vLayout += "<td><img src="+arrIcon5[i]+"><br /><span>"+arrMin5[i]+" - "+arrMax5[i]+"&degC</span></td>";
      infowindow.setContent(vLayout);
      infowindow.open(map, marker);
    }
  })(marker, i));
  }
}