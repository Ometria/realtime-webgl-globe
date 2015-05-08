var Product = function(elm){
  var last = '';
  var img = new Image();
  var api = {};

  api.init = function(){
    setInterval(function(){
      last = last.replace('s70x70', 's220x220');
  
      if(elm.src !== last){
        elm.classList.add('enter'); 

        img.onload = function(){
          elm.src = last;
          setTimeout(function(){ elm.classList.remove('enter'); }, 200);
        };

        img.src = last;
        // setTimeout(function(){

        // }, 200);
      }

    }, 2000);
  };

  api.set = function(image){
    if (image.indexOf('nophoto') < 0) {
      last = image;
    }
  };

  return api;
};