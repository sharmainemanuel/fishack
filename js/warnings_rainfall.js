var warningnum = [];
var weathersystem = [];

var yellowarea = [];
var orangearea = [];
var redarea = [];

var yellowimpact= [];
var orangeimpact = [];
var redimpact = [];

var vtime, vday, vmonth, vyear, vIssuedAt;

$(document).ready(function(){
	$.ajax({
		type:"GET",
		url: "http://m.weather.gov.ph/agaptest/rainfall_warning.php",
		async: false,
		success: function (a){

			vtime = a.result[1][0].Issued_Time;
			vday = a.result[1][0].Day;
			vmonth = a.result[1][0].Month;
			vyear = a.result[1][0].Year;
			vIssuedAt = vtime + " " + vday+ " " + vmonth + " " + vyear;

			for(i=0;i<=a.result.length-1;i++){

				warningnum.push(a.result[i][0].Warning_Number);
				weathersystem.push(a.result[i][0].Weather_System);

				yellowarea.push(a.result[i][0].Yellow_Area);
				orangearea.push(a.result[i][0].Orange_Area);
				redarea.push(a.result[i][0].Red_Area);

				yellowimpact.push(a.result[i][0].Yellow_Impact);
				orangeimpact.push(a.result[i][0].Orange_Impact);
				redimpact.push(a.result[i][0].Red_Impact);
			}
		}
	});
})
 	
function getData(x){
var yellow, red, orange, dstr;

if(yellowarea[x].trim() != "")
	yellow= "<li class='ui-li-static ui-body-inherit ui-li-has-thumb'> <img src=img/newyellow.png> <h2>"
		+yellowarea[x]+"</h2>	<p>"+yellowimpact[x]+"</p> </li> ";			
else
	yellow ="";

if(orangearea[x].trim() != "")
	orange= "<li class='ui-li-static ui-body-inherit ui-li-has-thumb'> <img src=img/neworange.png>  <h2>"
		+orangearea[x]+"</h2><p>"+orangeimpact[x]+"</p>  </li>";	
else
	orange ="";

if(redarea[x].trim() != "")
	red= "<li class='ui-li-static ui-body-inherit ui-li-has-thumb'> <img src=img/newred.png><h2>"
		+redarea[x]+"</h2><p>"+redimpact[x]+"</p>  </li>";		
else
	red ="";

dstr =	"<ul data-role=listview data-inset=false data-icon=false data-divider-theme=b class=ui-listview>"; 
dstr +=	"<li class='ui-li-static ui-body-inherit ui-first-child'> Warning Number: " + warningnum[x];
dstr +=	"</li> <li class='ui-li-static ui-body-inherit'> Weather System: " + weathersystem[x] + " </li> ";
dstr += yellow+orange+red+"</ul>" ;

document.getElementById('inner').innerHTML = dstr;

}