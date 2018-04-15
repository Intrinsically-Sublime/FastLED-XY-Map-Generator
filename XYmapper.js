function clearTest() {
  var myNode = document.getElementById('test');
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
  num = 0;
}

var num_leds = 0;
var xdim = 0;
var ydim = 0;
var pixelarray = [];
var serpentine = 0;
var hflip = 0;
var vflip = 1;
var vertical = 0;


function serpentineLayout(event) {
  if (event.checked) {
    serpentine = 1;
  } else {
    serpentine = 0;
  }

  renumberLEDs();
  drawArrows();
  printMap();

}

function hflipLayout(event) {
  if (event.checked) {
    hflip = 1;
  } else {
    hflip = 0;
  }

  renumberLEDs();
  drawArrows();
  printMap();
}

function discardPixels(event) {
  if (event.checked) {
    discardP = 1;
  } else {
    discardP = 0;
  }

  printMap();
}

function vflipLayout(event) {
  if (event.checked) {
    vflip = 1;
  } else {
    vflip = 0;
  }

  renumberLEDs();
  drawArrows();
  printMap();
}

function clearAllPixels(event) {
  if (event.checked) {
    clearAll = 1;
  } else {
    clearAll = 0;
  }

  buildGrid();
  renumberLEDs();
  drawArrows();
  printMap();
}


function verticalLayout(event) {
  if (event.checked) {
    vertical = 1;
  } else {
    vertical = 0;
  }

  renumberLEDs();
  drawArrows();
  printMap();
}


function buildArray(num_leds) {
  serpentine = (document.getElementById("serpentineCHK")).checked;
  vertical = (document.getElementById("verticalCHK")).checked;
  hflip = (document.getElementById("hflipCHK")).checked;
  vflip = (document.getElementById("vflipCHK")).checked;
  discardP = (document.getElementById("discardCHK")).checked;
  clearAll = (document.getElementById("clearAllCHK")).checked;


  for (i = 0; i < num_leds; i++) {
    pixelarray[i] = [];
    if (clearAll == 1) {
      pixelarray[i][0] = "D";	// E = Enable, D = Disable
    } else {
      pixelarray[i][0] = "E";	// E = Enable, D = Disable
    }
    pixelarray[i][1] = "N";	// N = No Arrow, R = Right, L = Left, D = Down, U = Up
    pixelarray[i][2] = 0;	// LED Index number
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
      gridHTML +='<div class="ledtext" id="pixeltext' + idnum + '">' + pixelarray[idnum][2] + '</div>';
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
  drawArrows();
  printMap();
}

function clearArrows(element) {
  // remove left arrows
  childnodes = element.getElementsByClassName("triangle-left");
  while(childnodes[0]) {
    element.removeChild(childnodes[0]);
  }

  // remove right arrows
  childnodes = element.getElementsByClassName("triangle-right");
  while(childnodes[0]) {
    element.removeChild(childnodes[0]);
  }

  // remove top arrows
  childnodes = element.getElementsByClassName("triangle-top");
  while(childnodes[0]) {
    element.removeChild(childnodes[0]);
  }

  // remove bottom arrows
  childnodes = element.getElementsByClassName("triangle-bottom");
  while(childnodes[0]) {
    element.removeChild(childnodes[0]);
  }

}


function clearButton(event) {
  eventindex = parseInt((event.id).replace(/[^0-9\.]/g, ''), 10);
  if (pixelarray[eventindex][0] == "E") {
    event.className = "disabledPixel";
    pixelarray[eventindex][0] = "D";
    clearArrows(event);
  } else if (pixelarray[eventindex][0] == "D") {
    event.className = "ledpixel";
    pixelarray[eventindex][0] = "E";
    drawArrows();
  }

  renumberLEDs();
  printMap();
}

function clearContents(element) {
  element.innerHTML = "";
}

function drawArrows() {
  for (i = 0; i < num_leds; i++) {
    pixelID = "pixel" + i;
    if (pixelarray[i][0] == "E") {
      pixelElement = document.getElementById(pixelID);
      clearArrows(pixelElement);

      // add a new div to the document
      arrownode = document.createElement("div");

      // apply the correct style to the new div

      if (pixelarray[i][1] == "R") {
        arrownode.className = "triangle-right";
      } else if (pixelarray[i][1] == "L") {
        arrownode.className = "triangle-left";
      } else if (pixelarray[i][1] == "U") {
        arrownode.className = "triangle-bottom";
      } else if (pixelarray[i][1] == "D") {
        arrownode.className = "triangle-top";
      }
      pixelElement.appendChild(arrownode);
    }
  }
}

function countActiveLEDs() {
  var activeCount = 0;
  for (i = 0; i < num_leds; i++) {
    if (pixelarray[i][0] == "E") activeCount++;
  }
  return activeCount;
}

function renumberLEDs() {
  var activeLEDs = 0;
  var inactiveLEDs = countActiveLEDs();
  var xtemp = 0;
  var ytemp = 0;

  if (vertical == 0 ) {
    ytemp = ydim;
    xtemp = xdim;
  } else {
    ytemp = xdim;
    xtemp = ydim;
  }


  for (y = 0; y < ytemp; y++) {
    for (x = 0; x < xtemp; x++) {
      if (vertical == 0) {
        if (vflip == 1) var ty = ytemp-y-1; else var ty = y;
        if (hflip == 1) var tx = xtemp-x-1; else var tx = x;
      } else {
        if (hflip == 1) var ty = ytemp-y-1; else var ty = y;
        if (((hflip == 1) ^ (vflip == 1)) ^ (serpentine == 0 && hflip == 1)) var tx = xtemp-x-1;
        //if ((hflip == 1) ^ (serpentine == 1 && vflip == 1)) var tx = xtemp-x-1;
        else var tx = x;
      }

      var ledpos = 0;
      var tDir = 'N';
      var oddcols = (xdim % 2 == 1 && hflip == 1 && vertical == 1);
      var evenrows = (ydim % 2 == 0 && vflip == 1 && vertical == 0);

        if ((((ty+evenrows+oddcols) % 2) == 0) || (serpentine==0)) {
          if (vertical == 0) {
            ledpos = ty*xtemp+tx;
            if (hflip == 1) tdir = "L"; else tdir = "R";
          } else {
            ledpos = tx*ytemp+ty;
            if ((vflip == 1) ^ (serpentine == 1 && hflip == 1)) tdir = "U"; else tdir = "D";
          }

        } else {
          if (vertical == 0) {
            ledpos = ty*xtemp+xtemp-1-tx;
            if (hflip == 1) tdir = "R"; else tdir = "L";
          } else {
            ledpos = (xtemp-tx-1)*ytemp+ty;
            if ((vflip == 1) ^ (serpentine == 1 && hflip == 1)) tdir = "D"; else tdir = "U";
          }
        }

      pixelarray[ledpos][1] = tdir;

      if (pixelarray[ledpos][0] == "E") {
          pixelarray[ledpos][2] = activeLEDs;
          activeLEDs++;
      } else if (pixelarray[ledpos][0] == "D" ) {
          pixelarray[ledpos][2] = inactiveLEDs;
          inactiveLEDs++;
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
  var currentPixel = 0;
  if (discardP == 1) {
    var visibleLEDs = countActiveLEDs();
    var hiddenPixel = visibleLEDs;
  } else {
    var visibleLEDs = xdim * ydim;
    var hiddenPixel = visibleLEDs;
  }
  var numleds = visibleLEDs + 1;
  mapDiv = document.getElementById("result");

  mapHTML = "";
  ledindex = 0;
  mapHTML += '<PRE>';

  if (discardP == 1) {
    mapHTML += '// XY mapping function discarding unchecked pixel data.<BR>';
    mapHTML += '// Requires ' + (numleds * 3) + ' Bytes\'s of SRAM';
    mapHTML += ' and ' + ((numleds * 30) / 1000) + ' ms/frame.<BR>';
    mapHTML += '// You are saving ' + ((((xdim * ydim) + 1) - numleds) * 3) + ' Bytes\'s of SRAM';
    mapHTML += ' and ' + ((((((xdim * ydim) + 1) * 30) / 1000) - ((numleds * 30) / 1000)).toFixed(2)) + ' ms/frame.<BR><BR>';
  } else {
    mapHTML += '// XY mapping function preserving all pixel data.<BR>';
    mapHTML += '// Requires ' + (numleds * 3) + ' Bytes\'s of SRAM';
    mapHTML += ' and ' + ((numleds * 30) / 1000) + ' ms/frame.<BR>';
    mapHTML += '// You COULD save ' + ((numleds - (countActiveLEDs() + 1)) * 3) + ' Bytes\'s of SRAM';
    mapHTML += ' and ' + (((((numleds * 30) / 1000)) - (((countActiveLEDs() + 1) * 30) / 1000)).toFixed(2)) + ' ms/frame.<BR><BR>';
  }

  mapHTML += '// Parameters for width and height<BR>';
  mapHTML += '#define MATRIX_WIDTH ' + xdim + '<BR>';
  mapHTML += '#define MATRIX_HEIGHT ' + ydim + '<BR><BR>';
  mapHTML += '#define NUM_LEDS ' + visibleLEDs + '';
  if (discardP == 1) {
    mapHTML += '	// Number of LEDs visible out of ' + (xdim * ydim) + '<BR><BR>';
  } else {
    mapHTML += '	// Number of data slots in Matrix<BR><BR>';
    mapHTML += '// ' + countActiveLEDs() + ' LEDs visible out of ' + visibleLEDs + '<BR><BR>';
  }

  mapHTML += 'CRGB leds[' + numleds + '];';
  if (discardP == 1) {
    mapHTML += '	// 1 extra pixel for hiding discarded and out of bounds data<BR><BR>';
  } else {
    mapHTML += '	// 1 extra pixel for hiding out of bounds data<BR><BR>';
  }

  if (num_leds <= 256) {
    mapHTML += 'uint8_t XY (uint8_t x, uint8_t y) {<BR>';
  } else {
    mapHTML += 'uint16_t XY (uint16_t x, uint16_t y) {<BR>';
  }
  mapHTML += '	// map anything outside of the matrix to the extra hidden pixel<BR>'
  mapHTML += '	if (x >= MATRIX_WIDTH || y >= MATRIX_HEIGHT) { return ' + hiddenPixel + '; }<BR><BR>';

  if (num_leds <= 256) {
    mapHTML += '	const uint8_t XYTable[] = ';
  } else {
    mapHTML += '	const uint16_t XYTable[] = ';
  }
  mapHTML += '{<BR>';
  for (y = 0; y < ydim; y++) {
    mapHTML += '		';
    for (x = 0; x < xdim; x++) {
      currentPixel = pixelarray[ledindex][2];
      if (currentPixel >= visibleLEDs && discardP == 1) {
        mapHTML += pad('    ', visibleLEDs, true);
      } else {
        mapHTML += pad('    ', currentPixel, true);
      }
      ledindex++;
      if (ledindex < num_leds) mapHTML += ",";
    }
    mapHTML += "<BR>";
  }
  mapHTML += '	};<BR><BR>';
  mapHTML += '	return XYTable[(y * MATRIX_WIDTH) + x];<BR>';

  mapHTML += '}</PRE>';

  mapDiv.innerHTML = mapHTML;
}

window.onload = buildGrid;
