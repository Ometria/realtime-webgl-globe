
//
// Ometria Globe Visualization
// 🌍🌎🌏 2015, Ometria
//

var fb = new Firebase("https://crackling-torch-8756.firebaseio.com/");
var div = document.getElementById('globe');
var logs = document.getElementById('log-container');
var urls = {
  earth: 'img/world.jpg',
  bump: 'img/bump.jpg',
  specular: 'img/specular.jpg',
};

var globe = new Globe(div, urls);

// start it
globe.init();


var drawLevitatingBlock = function(data) {
  // faking realtime-iness
  setTimeout(function() {
    globe.addLevitatingBlock(data);
  }, Math.round(Math.random()*300));
};

var centerBlock = function(data){
  // center the globe to the position
  globe.center({
    lat: data.lat - 10,
    lon: data.lon - 10
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
        val.color = val.is_ometria ? '#FF6D00' : '#03A9F4';
        val.size = 100;
        drawLevitatingBlock(val);

        if (i === 0) {
          centerBlock(val);
        }

      }
    }
  }
});
