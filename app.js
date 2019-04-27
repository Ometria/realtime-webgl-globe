
//
// Ometria Globe Visualization
// 🌍🌎🌏 2015, Ometria
//

// var particlesJS = require('particles.js');

var fb = new Firebase("https://crackling-torch-8756.firebaseio.com/");

var div = document.getElementById('globe');
var logs = document.getElementById('log-container');
var eventsSecond = document.querySelector('[data-hook=events-second]');

var urls = {
  earth: 'img/world.jpg',
  bump: 'img/bump.jpg',
  specular: 'img/specular.jpg',
};

var globe   = new Globe(div, urls);
var logger  = new Logger(logs);

var colorForEvent = {
  'addtobasket': '#03A9F4',   //blue
  'arrive': '#E8E000',        //yellow
  'checkout': '#5355f4',      //darker blue
  'homepage': '#a402f5',      //purple
  'listing': '#e90524',       //red
  'product': '#E477DA',       //pink
  'transaction': '#FF6D00',   //white
  'viewproduct': '#84BC00'    //green
};

// start it
globe.init();

var addLog = function(log, i){
  setTimeout(function(){
    logger.add(log);
  }, 100 * i);
};

var drawLevitatingBlock = function(data) {
  // faking realtime-iness
  setTimeout(function() {
    globe.addLevitatingBlock(data);
  }, Math.round(Math.random()*300));
};

var centerBlock = function(data){
  var offset = globe.getZoom() / 100;
  // center the globe to the position
  globe.center({
    lat: data.lat - offset,
    lon: data.lon - offset
  });
};

// Get the data!
fb.child('data').on('value', function(value){
  /*
    {
      color: #FF6600,
      size: 0 to 100,
      lat: Math.random() * 160 - 80,
      lon: Math.random() * 360 - 180,
    }
  */
  var vals = value.val();

  if (vals.length) {
    for (var i = vals.length - 1; i >= 0; i--) {
      var val = vals[i];

      if (!isNaN(val.lat) && !isNaN(val.lon)) {
        val.color = val.is_ometria ? '#FF6D00' : colorForEvent[val.type];
        val.size = 100;
        
        addLog(vals[i], i);
        drawLevitatingBlock(val);

        if (i === 0) {
          centerBlock(val);
        }

      }
    }
  }
});

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles', 'particles.json', function() {
  console.log('callback - particles.js config loaded');
});

fb.child('rate').on('value', function(value){
  let v = value.val();
  console.log(v)
  eventsSecond.textContent = v.event_count;
});
