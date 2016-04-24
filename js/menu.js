	

$(document).ready(function() {

var links = [
{
  "bgcolor":"#03A9F4",
  "icon":"+"
},
{
  "url":"main2.html",
   "bgcolor":"#00ACEE",
  "color":"#fffff",
  "icon":"<img src='img/map_icon.png' width='100%' height='100%' />"
},
{
  "url":"camera3.html",
  "bgcolor":"#00ACEE",
  "color":"#fffff",
  "icon":"<img src='img/report_icon.png' width='100%' height='100%' />",
},

{
  "url":"gallery.html",
   "bgcolor":"#00ACEE",
  "color":"#fffff",
  "icon":"<img src='img/gallery_icon.png' width='100%' height='100%' />",
},
{
  "url":"local.html",
   "bgcolor":"#00ACEE",
  "color":"#fffff",
  "icon":"<img src='img/fished_icon.png' width='100%' height='100%' />"
},
{
  "url":"info.html",
   "bgcolor":"#00ACEE",
  "color":"#fffff",
  "icon":"<img src='img/info_icon.png' width='100%' height='100%' />",
  "target":"_blank"
}
]

$('.kc_fab_wrapper').kc_fab(links);

});