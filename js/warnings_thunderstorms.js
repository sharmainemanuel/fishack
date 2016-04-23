function getData(){	
		var divisionResult = document.getElementById('div').value;
		$.ajax
({
  type: "GET",
  url: "http://m.weather.gov.ph/agaptest/ts_advisory.php",
  async: false,
  success: function (result2){
			var time = result2.result[1][0].Issued_Time;
			var day = result2.result[1][0].Day;
			var month = result2.result[1][0].Month;
			var year = result2.result[1][0].Year;
			var issued_at = time + " " +day+" " +month+ " " +year;
			for(j=0; j<=result2.result.length; j++){
			var division = result2.result[j][0].Division;
			var Advisory = result2.result[j][0].Advisory;
			var Advisory_2 = result2.result[j][0].Advisory_2;
			var Advisory_3 = result2.result[j][0].Advisory_3;
			var Advisory_Number = result2.result[j][0].Advisory_Number;
					if(division == divisionResult){
						document.getElementById('inner').innerHTML = "<p style=font-weight:bold>Thunderstorm Advisory</p><br><center><img src=img/newthunderstom.png width=30% height=30% ></center><br><span>Issued at : </span><br>"+issued_at+ "<br><br>"+"<span>Advisory Number :</span><br>"+Advisory_Number+"<br><br><span>Advisory I: </span><br>"+Advisory+"<br><br><span>Advisory II: </span><br>"+Advisory_2+"<br><br><span>Advisory III: </span><br>"+Advisory_3+"</span>";
							
				}	
			}
		}

	
});


}