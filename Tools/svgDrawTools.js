// FUnction for object color form severity index
function getQualityColour(quality, maxQuality){
    var hue = 120 * ( 1 - (quality / maxQuality));
    var lightness = '50%'
    return 'hsl(' + hue + ', 100%, ' + lightness + ')';
  }
  
  
  // Function for speed
function getSpeedDuration(speed){
    switch(speed){
      case 'slow':
        return 1000;
      case 'medium':
        return 500;
      case 'fast':
        return 200;
      default:
        return 0;
    }

}

function getAnimationDuration(speed) {
    switch (speed) {
        case 'slow':
            return 2000; // Example duration for slow animation (2000 milliseconds)
        case 'medium':
            return 1000; // Example duration for medium animation (1000 milliseconds)
        case 'fast':
            return 500; // Example duration for fast animation (500 milliseconds)
        default:
            return 1000; // Default duration for medium animation (1000 milliseconds)
    }
}

function disableOptions(list, optionsToDisable) {
    optionsToDisable.forEach(option => {
      const disabledItem = Array.from(list.children).find(item => item.textContent === option);
      disabledItem.style.pointerEvents = 'none';
      disabledItem.style.opacity = '0.5';
    });
}
  
  // Function to enable specific speed options
function enableOptions(list, optionsToEnable) {
    optionsToEnable.forEach(option => {
      const enabledItem = Array.from(list.children).find(item => item.textContent === option);
      enabledItem.style.pointerEvents = 'auto';
      enabledItem.style.opacity = '1';
    });
}
  
function enableAllOptions() {
    speedChoice.forEach(option => {
      const enabledItem = document.querySelector(`li:contains('${option}')`);
      enabledItem.style.pointerEvents = 'auto';
      enabledItem.style.opacity = '1';
    });
}
  

//Disable the other options when ajusting speed
function speedAdjustment(list, selectedSpeedChoice) {
    switch(selectedSpeedChoice) {
      case 'slow':
        disableOptions(list, ['medium', 'fast']);
        setTimeout(() => {
          enableOptions(list, ['fast']);
          enableOptions(list, ['medium']);
        }, getAnimationDuration('slow') * (21/2));
        break;
      case 'medium':
        disableOptions(list, ['slow', 'fast']);
        setTimeout(() => {
          enableOptions(list, ['slow']);
          enableOptions(list, ['fast']);
        }, getAnimationDuration('medium') * (21/2));
        break;
      case 'fast':
        disableOptions(list, ['slow', 'medium']);
        setTimeout(() => {
          enableOptions(list, ['slow']);
          enableOptions(list, ['medium']);
        }, getAnimationDuration('fast') * (21/2));
        break;
      default: 
        enableAllOptions();
    }
}


function getRandomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


