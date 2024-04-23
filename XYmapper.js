function clearTest() {
  var myNode = document.getElementById('test');
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
  num = 0;
}

var triState = 0;
var gaps = 1;
var num_leds = 0;
var xdim = 0;
var ydim = 0;
var pixelarray = [];
var discardP = 1;
var clearAll = 0;

function download(){
    var a = document.body.appendChild(
        document.createElement("a")
    );
    a.download = "2d-gaps.json";
    a.href = "data:text/html," + document.getElementById("result").innerText; // Grab the HTML
    a.click(); // Trigger a click on the element
}

function triOutput(event) {
  triState = 1;
  gaps = 0;
  renumberLEDs();
  printMap();
}

function gapOutput(event) {
  triState = 0;
  gaps = 1;
  renumberLEDs();
  printMap();
}

function discardPixels(event) {
  if (event.checked) {
    discardP = 1;
  } else {
    discardP = 0;
  }

  renumberLEDs();
  printMap();
}

function clearAllPixels(event) {
  if (event.checked) {
    clearAll = 1;
  } else {
    clearAll = 0;
  }

  renumberLEDs();
  printMap();
}

function buildArray(num_leds) {
  triState = (document.getElementById("triCHK")).checked;
  gaps = (document.getElementById("gapCHK")).checked;
  discardP = (document.getElementById("discardCHK")).checked;
  clearAll = (document.getElementById("clearAllCHK")).checked;

  for (i = 0; i < num_leds; i++) {
    pixelarray[i] = [];
    if (clearAll == 1) {
      pixelarray[i][0] = "D";	// E = Enable, D = Disable, H = Hidden
    } else {
      pixelarray[i][0] = "E";	// E = Enable, D = Disable, H = Hidden
    }
    pixelarray[i][1] = "N";	// N = Not used for gap files
    pixelarray[i][2] = 0;	  // LED Index number
  }

  pixelarray.join("\",\"");
}

function buildGrid(numBoxes) {
  gridHTML = "";
  container = document.getElementById('ledgrid');
  clearContents(container);
  xdim = Number(document.getElementById('xdim').value);
  ydim = Number(document.getElementById('ydim').value);

  num_leds = xdim * ydim; // set the max number pixels
  buildArray(num_leds);
  idnum = 0;
  gridHTML += '<div class="ledarray">';
  gridHTML += '<div class="ledrow"><div class="xlabels"></div>';
  for (x = 0; x < xdim; x++) gridHTML += '<div class="xlabels">' + x + '</div>';
  gridHTML += '<div class="xlabels"></div></div>';
  for (j = 0; j < ydim; j++) {
    gridHTML += '<div class="ledrow">';
    gridHTML += '<div class="ylabels">' + j + '</div>';
    for (i = 0; i < xdim; i++) {
      if (clearAll == 1) {
        gridHTML += '<div class="disabledPixel" id="pixel' + idnum + '"';
      } else {
        gridHTML += '<div class="ledpixel" id="pixel' + idnum + '"';
      }
      gridHTML += 'onclick="clearButton(this);">';
      gridHTML += '<div class="ledtext" id="pixeltext' + idnum + '">' + pixelarray[idnum][2] + '</div>';
      gridHTML += '</div>';
      idnum++;
    }
    gridHTML += '<div class="ylabels">' + j + '</div>';
    gridHTML += "</div>";
  }
  gridHTML += '<div class="ledrow"><div class="xlabels"></div>';
  for (x = 0; x < xdim; x++) gridHTML += '<div class="xlabels">' + x + '</div>';
  gridHTML += '<div class="xlabels"></div></div>';
  gridHTML += '</div>';

  container.innerHTML = gridHTML;

  renumberLEDs();
  printMap();
}

function clearButton(event) {
  eventindex = parseInt((event.id).replace(/[^0-9\.]/g, ''), 10);
  if (pixelarray[eventindex][0] == "E") {
    if (discardP == 1 || triState == 1) {
      event.className = "disabledPixel";
      pixelarray[eventindex][0] = "D";
    } else {
      event.className = "hiddenPixel";
      pixelarray[eventindex][0] = "H";
    }
  } else if (pixelarray[eventindex][0] == "D") {
    if (triState == 1) {
      event.className = "hiddenPixel";
      pixelarray[eventindex][0] = "H";
    } else {
      event.className = "ledpixel";
      pixelarray[eventindex][0] = "E";
    }
  } else if (pixelarray[eventindex][0] == "H") {
    event.className = "ledpixel";
    pixelarray[eventindex][0] = "E";
  }

  renumberLEDs();
  printMap();
}

function clearContents(element) {
  element.innerHTML = "";
}

function countActiveLEDs() {
  var activeCount = 0;
  for (i = 0; i < num_leds; i++) {
    if (pixelarray[i][0] == "E") activeCount++;
  }
  return activeCount;
}

function renumberLEDs() {
  for (y = 0; y < ydim; y++) {
    for (x = 0; x < xdim; x++) {
      var ledpos = 0;
      var oddcols = (xdim % 2 == 1);
      var evenrows = (ydim % 2 == 0);

        if (((y+evenrows+oddcols) % 2) == 0) {
          ledpos = y*xdim+x;
        } else {
          ledpos = y*xdim+xdim-1-x;
        }

        if (pixelarray[ledpos][0] == "E") {
          if (gaps == 1 || triState == 1) {
            pixelarray[ledpos][2] = 1;
          }
        } else {
          if ((gaps == 1 && discardP == 0) || (triState == 1 && pixelarray[ledpos][0] == "H")) {
            pixelarray[ledpos][2] = 0;
          } else if (triState == 1 || discardP == 1) {
            pixelarray[ledpos][2] = -1;
          }
        }

      pixelID = "pixeltext" + ledpos;
      pixelElement = document.getElementById(pixelID);
      pixelElement.innerHTML = "" + pixelarray[ledpos][2].toString();
    }
  }
}

function pad(pad, str, padLeft) {
  if (typeof str === 'undefined')
    return pad;
  if (padLeft) {
    return (pad + str).slice(-pad.length);
  } else {
    return (str + pad).substring(0, pad.length);
  }
}

function printMap() {
  mapDiv = document.getElementById("infoOut");

  mapHTML = "";
  mapHTML += '<PRE>';  
  mapHTML += '// wLED 2d-gaps.json file.<BR>';
  mapHTML += '// ' + countActiveLEDs() + ' LEDs visible out of ' + (xdim * ydim) + '<BR>';
  mapHTML += '// Copy the entire array below, including the brackets[]';
  mapHTML += '</PRE>';

  mapDiv.innerHTML = mapHTML;

  mapDiv = document.getElementById("result");

  mapHTML = "";
  ledindex = 0;
  mapHTML += '<PRE>';
  mapHTML += '[<BR>';
    for (x = 0; x < num_leds; x++) {
      mapHTML += pad('  ', pixelarray[ledindex][2], true);
      ledindex++;
      if (ledindex < num_leds) mapHTML += ",";
      if ((x+1) % xdim === 0) mapHTML += '<BR>';
    }
  mapHTML += ']</PRE>';

  mapDiv.innerHTML = mapHTML;
}

window.onload = buildGrid;
