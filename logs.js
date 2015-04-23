var Logger = function(container){
  var logs = [];
  var item = document.createElement('DIV');
  var height = 20;

  // The number of events that fit on screen (needs to be calculated)
  var onScreen = 5;

  var api = {};

  function deg_to_dms (deg) {
     var d = Math.floor (deg);
     var minfloat = (deg-d)*60;
     var m = Math.floor(minfloat);
     var secfloat = (minfloat-m)*60;
     var s = Math.round(secfloat);
     // After rounding, the seconds might become 60. These two
     // if-tests are not necessary if no rounding is done.
     if (s==60) {
       m++;
       s=0;
     }
     if (m==60) {
       d++;
       m=0;
     }
     return ("" + d + "°" + m + "'" + s + "\"");
  }  

  api.add = function(data){
    var clone = item.cloneNode(true);

    var n = (deg_to_dms(data.lat));
    var w = (deg_to_dms(data.lon));

    n += Array(Math.max(10 - n.length, 0) + 1).join('&nbsp;');
    w += Array(Math.max(11 - w.length, 0) + 1).join('&nbsp;');

    clone.innerHTML = new Date().toISOString().split('T')[1].split('Z')[0] + ' [' + n + ' N ' + w + ' W]' + ': ' + data.type.toUpperCase();
    clone.style.color = data.color;
    container.insertBefore(clone, container.firstChild);

    if (container.childNodes.length >= (container.offsetHeight / height)) {
      container.childNodes[container.childNodes.length - 1].remove();
    }
  };

  return api;
};