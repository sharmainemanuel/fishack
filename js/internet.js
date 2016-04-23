$(document).ready(function() {

function Logger(id) {	
  this.el = document.getElementById('log');
}
Logger.prototype.log = function(msg) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(document.createTextNode(msg));
  fragment.appendChild(document.createElement('br'));
  this.el.appendChild(fragment);
};

Logger.prototype.clear = function() {
  this.el.textContent = '';
};

var logger = new Logger('log');

function updateConnectionStatus(msg, connected) {
  var el = document.querySelector('#connection');
  if (connected) {
    if (el.classList) {
      el.classList.add('connected');
      el.classList.remove('disconnected');
    } else {
      el.addClass('connected');
      el.removeClass('disconnected');
    }
  } else {
    if (el.classList) {
      el.classList.remove('connected');
      el.classList.add('disconnected');
    } else {
      el.removeClass('connected');
      el.addClass('disconnected');
    }
  }
  el.innerHTML = msg + '<div></div>';
}

window.addEventListener('load', function(e) {
  if (navigator.onLine) {
    updateConnectionStatus('', true);
  } else {
// var  msg =  updateConnectionStatus('No Internet Connection', false);
  new $.nd2Toast({ 
   message : "No Internet Connection", // Required
   action : { // Optional (Defines the action button on the right)
     title : "Try Again", // Title of the action button
     fn : function() { // function that will be triggered when action clicked
        //console.log("Action Button clicked'");
		location.href="main2.html";
     },
     color : "red" // optional color of the button (default: 'lime')
   },
   ttl : 8000 // optional, time-to-live in ms (default: 3000)
 });
  }
}, false);
});