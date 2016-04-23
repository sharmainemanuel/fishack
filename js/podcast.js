 $(document).ready(function()
      {
        $.get('Mydata.xml', function(d){
        $('body').append('<h1> Recommended Web Development Books </h1>');
        $('body').append('<dl />');
 
        $(d).find('book').each(function(){
 
            var $book = $(this); 
            var title = $book.attr("title");
            var description = $book.find('description').text();
            var imageurl = $book.attr('imageurl');
 
            var html = '<dt> <img class="bookImage" alt="" src="' + imageurl + '" /> </dt>';
            html += '<dd> <span class="loadingPic" alt="Loading" />';
            html += '<p class="title">' + title + '</p>';
            html += '<p> ' + description + '</p>' ;
            html += '</dd>';
 
            $('dl').append($(html));
             
            $('.loadingPic').fadeOut(1400);
        });
    });
});