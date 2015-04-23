
//
// Ometria Arduino Stuff for the Globe Visualization
// 🌍🌎🌏 2015, Ometria
//

var five = require('johnny-five');
var Firebase = require('firebase');
var board = new five.Board();

var fb = new Firebase("https://crackling-torch-8756.firebaseio.com/");

// Components
var rgb,
    servo;

board.on("ready", function() {

  // Components
  rgb = new five.Led.RGB({
    pins: {
      red: 6,
      green: 5,
      blue: 3
    }
  });

  servo = new five.Servo({
    pin: 9,
    startAt: 0
  });

  // this.repl.inject({
  //   servo: servo
  // });

  // Firebase data
  fb.child('stats').on('value', function(value){
    var data = value.val();
    console.log(data);

    lightLed(data);
    goServo(data);

  });
});

function lightLed(data){
  if(data.android > data.iphone){
    rgb.color('#ff0000');
  } else {
    rgb.color('#00ff00');
  }
}

function goServo(data){
  var diff = (((data.iphone - data.android)/Math.max(data.iphone, data.android)) * 90) + 90;
  console.log(diff);
  servo.to(Math.round(diff));
}


