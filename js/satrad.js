$(document).ready(function()
{
	$(function(){
		$.ajax({
			url:'a.php',
			dataType:'JSON',
			data:{},
			type:'POST',
			success:function(data)
			{
				var myAnim, imgCounter, nextImage;
				console.log(data);
				console.log("length: " + data.length)
				console.log("Firstfile: " + data[0])
				imgCounter = 0;

				myAnim = setInterval(function(){
					  	$(".myImageHolder").attr('src', nextImage = function(){
					  		if(imgCounter > data.length - 1)
					  			imgCounter = 0;
					  		return "img2/" + data[imgCounter++]});}, 1000);
			},
			error: function(){alert("ERROR!")}
		})
	})
})