var Logger = function(container){
  var logs = [];
  var item = document.createElement('DIV');
  var height = 15;

  // The number of events that fit on screen (needs to be calculated)
  var onScreen = 5;

  var api = {};

  api.add = function(data){
    var clone = item.cloneNode(true);
    clone.innerHTML = (new Date()).toISOString();
    container.insertBefore(clone, container.firstChild);
    
    if (container.childNodes.length >= (container.offsetHeight / height)) {
      container.childNodes[container.childNodes.length - 1].remove();
    }
  };

  return api;
};