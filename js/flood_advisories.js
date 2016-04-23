
				$(document).ready(function(){
		$.ajax
({

  type: "GET",
  url: "http://manuelsharmaine.pe.hu/gfa_list.php",
  async: false,

  success: function (result2){
	setTimeout(function(){
		$('#imgLoader').fadeOut();
 	//var time = result2.result.entry[0].title;
var time = result2.result.entry.length;

 for(var i = 0; i < time; i++){
console.log(result2.result.entry[i].title);


	$( ".inner" ).append( result2.result.entry[i].title +"<br> ");

  }

 }, 1000);	
	},  error: function (request, textStatus, errorThrown) {
        console.log(request.responseText);
        console.log(textStatus);
        console.log(errorThrown);
    }
});
});