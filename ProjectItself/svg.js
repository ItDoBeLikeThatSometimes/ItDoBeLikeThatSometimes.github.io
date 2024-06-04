let selectedYearChoice = null;
let selectedSpeedChoice = null;
let evenMoreDynamicSpeedChoice = null;



// Static year representation button and the event listener for it
const staticYearButton = document.getElementById('staticYearButton');
staticYearButton.addEventListener('click', function(){
  selectedYearChoice = null;
  if(list.style.display == 'block'){
    list.style.display = 'none'
  }
  else{
    list.style.display = 'block';
  }
});


// Dynamic year button and the event listenr for it
const dynamicYearButton = document.getElementById('dynamicYearButton');
dynamicYearButton.addEventListener('click', function(){
  selectedSpeedChoice = null;
  if(dynamicList.style.display == 'block'){
    dynamicList.style.display = 'none'
  }
  else{
    dynamicList.style.display = 'block';
  }
})



const evenMoreDynamicSpeedList = document.getElementById('evenMoreDynamicSpeedChoice')
const evenMoreDynamicYearButton = document.getElementById('evenMoreDynamicYearButton')
evenMoreDynamicSpeedList.style.display = 'none'

//Speed button
evenMoreDynamicYearButton.addEventListener('click', function(){
  evenMoreDynamicSpeedChoice = null;
  if(evenMoreDynamicSpeedList.style.display == 'block'){
    evenMoreDynamicSpeedList.style.display = 'none';
  }
  else{
    evenMoreDynamicSpeedList.style.display = 'block';
  }
})


// Speed options Slow/Medium/Fast
const evenMoreDynamicSpeedPosibilities = ['slow', 'medium', 'fast']
evenMoreDynamicSpeedPosibilities.forEach(speedChoice => {
    var speedItem = document.createElement('li')
    speedItem.textContent = speedChoice
    speedItem.addEventListener('click', function(){
      evenMoreDynamicSpeedList.querySelectorAll('li').forEach(li => {
        li.style.backgroundColor = '';
        svgEvenMoreDynamic(false, 0)
      });
      if(evenMoreDynamicSpeedChoice === speedChoice){
        evenMoreDynamicSpeedChoice = null;
        svgEvenMoreDynamic(false, 0)
      } else {
        evenMoreDynamicSpeedChoice = speedChoice;
        speedItem.style.backgroundColor = 'lightblue';
        svgEvenMoreDynamic(true, evenMoreDynamicSpeedChoice)

        speedAdjustment(selectedSpeedChoice);
      }
    })
    evenMoreDynamicSpeedList.appendChild(speedItem);
  });



  
// Static year choice 
const list = document.getElementById('staticYearChoice')
list.style.display = 'none'
const yearchoices = ['2000','2001','2002','2003','2004','2005','2006','2007','2008',
                     '2009','2010','2011','2012','2013','2014','2015','2016','2017',
                     '2018','2019','2020']


// Here is the implementation of the year choices
yearchoices.forEach(choice => {
  const listItem = document.createElement('li');
  listItem.textContent = choice;
  listItem.addEventListener('click', function(){
    list.querySelectorAll('li').forEach(li => {
      li.style.backgroundColor = '';
      drawSVG('delete');
    });
    if(selectedYearChoice === choice){
      selectedYearChoice = null;
      drawSVG('delete');
    } else {
      selectedYearChoice = choice;
      listItem.style.backgroundColor = 'lightblue';
      drawSVG('update');
    }
  })
  list.appendChild(listItem);
});


// Dynamic speed implementation
const dynamicList = document.getElementById('dynamicSpeedChoice')
dynamicList.style.display = 'none'
const speedButtons = dynamicList.getElementsByTagName('li'); // Get all speed choice buttons
const speedChoice = ['slow', 'medium', 'fast']

speedChoice.forEach(choice => {
  const listItem = document.createElement('li');
  listItem.textContent = choice;
  listItem.addEventListener('click', function(){
    dynamicList.querySelectorAll('li').forEach(li => {
       li.style.backgroundColor = '';
      drawDynamicSVG(false, 0);
    });
    if(selectedSpeedChoice === choice){
      selectedSpeedChoice = null;
      drawDynamicSVG(false, 0);
    } else {
        selectedSpeedChoice = choice;
        listItem.style.backgroundColor = 'lightblue';
        drawDynamicSVG(true, selectedSpeedChoice)

        speedAdjustment(selectedSpeedChoice);
    }

  })
  dynamicList.appendChild(listItem);
});


//Disable the other options when ajusting speed
function speedAdjustment(selectedSpeedChoice) {
        switch(selectedSpeedChoice) {
          case 'slow':
            disableOptions(['medium', 'fast']);
            setTimeout(() => {
              enableOptions(['fast']);
              enableOptions(['medium']);
            }, getAnimationDuration('slow') * (21/2));
            break;
          case 'medium':
            disableOptions(['slow', 'fast']);
            setTimeout(() => {
              enableOptions(['slow']);
              enableOptions(['fast']);
            }, getAnimationDuration('medium') * (21/2));
            break;
          case 'fast':
            disableOptions(['slow', 'medium']);
            setTimeout(() => {
              enableOptions(['slow']);
              enableOptions(['medium']);
            }, getAnimationDuration('fast') * (21/2));
            break;
          default: 
            enableAllOptions();
        }
}

function disableOptions(optionsToDisable) {
  optionsToDisable.forEach(option => {
    const disabledItem = Array.from(dynamicList.children).find(item => item.textContent === option);
    disabledItem.style.pointerEvents = 'none';
    disabledItem.style.opacity = '0.5';
  });
}

// Function to enable specific speed options
function enableOptions(optionsToEnable) {
  optionsToEnable.forEach(option => {
    const enabledItem = Array.from(dynamicList.children).find(item => item.textContent === option);
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




document.body.appendChild(list);

// Function for drawing static SVG's
function drawSVG(updateOrDelete){
    if(updateOrDelete == 'update'){
        // Create an SVG element
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "6300");
      svg.setAttribute("height", "800");
  
      var maxNumber = 45000   
      var numberScale = 500 / maxNumber
      var severityIndexMax = 50000;
    
      const yearList = [] 

      data.forEach(entry => {
         if(entry.year == selectedYearChoice){
          yearList.push(entry);
        }
      });

      yearList.forEach(function(entry, index){ 
         if(entry['year'] == selectedYearChoice){
           var rectWidth = 150;
           var rectHeight = entry["number"] * numberScale
           var rectX = index * (rectWidth + 10);
           var rectY = 600 - rectHeight;
           var severity = entry["number"]
           var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
           rect.setAttribute("x", rectX);
           rect.setAttribute("y", rectY);
           rect.setAttribute("width", rectWidth);
           rect.setAttribute("height", rectHeight);
           rect.setAttribute("fill", getQualityColour(severity, severityIndexMax));
           svg.appendChild(rect);


            var countryName = document.createElementNS("http://www.w3.org/2000/svg", "text");
            countryName.setAttribute("x", rectX + rectWidth / 2);
            countryName.setAttribute("y", rectY + rectHeight + 15);
            countryName.setAttribute("text-anchor", "middle");
           countryName.textContent = entry["country"];
           svg.appendChild(countryName);
        }
       });
      document.getElementById("svg-container").appendChild(svg);
    }
    if (updateOrDelete == 'delete'){
      while(document.getElementById("svg-container").firstChild){
        document.getElementById("svg-container").removeChild(document.getElementById("svg-container").firstChild)    //Rewrite it please. Use const
      }
    }  
}
    


// Function fro drawing Dynamic SVG's
function drawDynamicSVG(active, speed){ //boolean, true or false
    if(active){
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "2000");
      svg.setAttribute("height", "800");
  
      var maxNumber = 45000   
      var numberScale = 500 / maxNumber
      var severityIndexMax = 50000;

      
      yearchoices.forEach(function(year, yearIndex){

        const delay = yearIndex * getSpeedDuration(speed);

        setTimeout(() => {
          while(svg.firstChild){
            svg.removeChild(svg.firstChild);
          }

          var yearEntries = data.filter(item => item.year === parseInt(year));

          var yearImage = document.createElementNS("http://www.w3.org/2000/svg", "text");
          yearImage.setAttribute("x", 1000);
          yearImage.setAttribute("y", 100 );
          yearImage.setAttribute("text-anchor", "middle");
          yearImage.textContent = year;
          svg.appendChild(yearImage);


          yearEntries.forEach(function(entry, index){ 
            var rectWidth = 150;
            var rectHeight = entry["number"] * numberScale
            var rectX = index * (rectWidth + 10);
            var rectY = 600 - rectHeight;
            var severity = entry["number"]


            var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", rectX);
            rect.setAttribute("y", rectY);
            rect.setAttribute("width", rectWidth);
            rect.setAttribute("height", rectHeight);
            rect.setAttribute("fill", getQualityColour(severity, severityIndexMax));
            svg.appendChild(rect);

            var countryName = document.createElementNS("http://www.w3.org/2000/svg", "text");
            countryName.setAttribute("x", rectX + rectWidth / 2);
            countryName.setAttribute("y", rectY + rectHeight + 15);
            countryName.setAttribute("text-anchor", "middle");
            countryName.textContent = entry["country"];
            svg.appendChild(countryName);
        });
        document.getElementById("svg-container").appendChild(svg)
        }, delay);
      });
        } else {
          while(document.getElementById("svg-container").firstChild){
            document.getElementById("svg-container").removeChild(document.getElementById("svg-container").firstChild)    //Rewrite it please. Use const
          }
        }
}
  


// Even more dynamic visualization of data
function svgEvenMoreDynamic(active, speed){
  if(active){
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "2000");
      svg.setAttribute("height", "1100");
  
      yearchoices.forEach(function(year, yearIndex){

        const delay = yearIndex * getSpeedDuration(speed);

        setTimeout(() => {
          while(svg.firstChild){
            svg.removeChild(svg.firstChild);
        }

        var yearEntries = data.filter(item => item.year === parseInt(year));
        
        var yearImage = document.createElementNS("http://www.w3.org/2000/svg", "text");
        yearImage.setAttribute("x", 1000);
        yearImage.setAttribute("y", 100 );
        yearImage.setAttribute("text-anchor", "middle");
        yearImage.textContent = year;
        svg.appendChild(yearImage);

        yearEntries.forEach(function(entry, index){

          var totalNumber = entry['total']   
          var number = entry['number']
          var spacing = 250;

          var numberScaleTotal = totalNumber
          var numberScaleNumber = 500 / number
          var severityIndexAverage = 0.5 * entry['total'] 


            //Creating the circle>  total
          var radius = numberScaleTotal/2500
          var rectX = spacing + index * spacing;


          //Y position increase>  number
          var rectY = 800 - (2 * radius) - (numberScaleNumber);
          var severity = number

          var circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
          circle.setAttribute('cx', rectX)
          circle.setAttribute('cy', rectY)
          circle.setAttribute('r', radius)
          circle.setAttribute('stroke', 'black')
          circle.setAttribute('stroke-width', 2)
          circle.setAttribute('fill', getQualityColour(severity, severityIndexAverage))
          svg.appendChild(circle)

          var countryName = document.createElementNS("http://www.w3.org/2000/svg", "text");
          countryName.setAttribute("x", rectX);
          countryName.setAttribute("y", rectY + radius +  50);
          countryName.setAttribute("text-anchor", "middle");
          countryName.textContent = entry["country"];
          svg.appendChild(countryName);
        });
        document.getElementById("svg-container").appendChild(svg)
        }, delay);
      });
    } else{
      while(document.getElementById("svg-container").firstChild){
        document.getElementById("svg-container").removeChild(document.getElementById("svg-container").firstChild)    //Rewrite it please. Use const
      }
    }
}
        

      

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




