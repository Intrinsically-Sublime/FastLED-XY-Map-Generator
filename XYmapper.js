function clearTest() {
  var myNode = document.getElementById('test');
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
  num = 0;
}

var freeStyle = 0;
var gaps = 1;
var wled = 0;
var fastled = 0;
var num_leds = 0;
var xdim = 0;
var ydim = 0;
var pixelarray = [];
var serpentine = 0;
var hflip = 0;
var vflip = 1;
var vertical = 0;
var discardP = 1;
var clearAll = 0;
var pout = 1;
var wiringSerp = "serpentine";
var wiringVert = "horizontal";
var wiringVFlip = "top";
var wiringHFlip = "left";
var cylindrical = 0;
var freestyleCounter = 0;
var lastFreestyle = 0;

function freeOutput(event) {
  if (event.checked) {
    freeStyle = 1;
    gaps = 0;
    wled = 0;
    fastled = 0;
    renumberLEDs();
    drawArrows();
    printMap();
  }
}

function gapOutput(event) {
  if (event.checked) {
    freeStyle = 0;
    gaps = 1;
    wled = 0;
    fastled = 0;
    renumberLEDs();
    printMap();
  }
}

function wLedOutput(event) {
  if (event.checked) {
    freeStyle = 0;
    gaps = 0;
    wled = 1;
    fastled = 0;
    renumberLEDs();
    printMap();
  }
}

function fastLEDOutput(event) {
    if (event.checked) {
    freeStyle = 0;
    gaps = 0;
    wled = 0;
    fastled = 1;
    renumberLEDs();
    printMap();
  }
}

function serpentineLayout(event) {
  if (event.checked) {
    serpentine = 1;
    wiringSerp = "serpentine";
  } else {
    serpentine = 0;
    wiringSerp = "striped";
  }

  renumberLEDs();
  drawArrows();
  printMap();
}

function hflipLayout(event) {
  if (event.checked) {
    hflip = 1;
    wiringHFlip = "right";
  } else {
    hflip = 0;
    wiringHFlip = "left";
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

  renumberLEDs();
  drawArrows();
  printMap();
}

function cylinderMatrix(event) {
  if (event.checked) {
    wrapX = 1;
  } else {
    wrapX = 0;
  }

  printMap();
}

function parallelOut(event) {
  pout = (document.getElementById("poutBOX")).value;
  printMap();
}

function vflipLayout(event) {
  if (event.checked) {
    vflip = 1;
    wiringVFlip = "bottom";
  } else {
    vflip = 0;
    wiringVFlip = "top";
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

  renumberLEDs();
  drawArrows();
  printMap();
}

function verticalLayout(event) {
  if (event.checked) {
    vertical = 1;
    wiringVert = "vertical";
  } else {
    vertical = 0;
    wiringVert = "horizontal";
  }

  renumberLEDs();
  drawArrows();
  printMap();
}

function buildArray(num_leds) {
  freeStyle = (document.getElementById("freeCHK")).checked;
  gaps = (document.getElementById("gapCHK")).checked;
  wled = (document.getElementById("wLedCHK")).checked;
  fastled = (document.getElementById("fastCHK")).checked;
  serpentine = (document.getElementById("serpentineCHK")).checked;
  vertical = (document.getElementById("verticalCHK")).checked;
  hflip = (document.getElementById("hflipCHK")).checked;
  vflip = (document.getElementById("vflipCHK")).checked;
  discardP = (document.getElementById("discardCHK")).checked;
  clearAll = (document.getElementById("clearAllCHK")).checked;
  wrapX = (document.getElementById("cylinderCHK")).checked;
  pout = (document.getElementById("poutBOX")).value;

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
    if (freeStyle == 1 && pixelarray[eventindex][3] == lastFreestyle) {
      pixelarray[eventindex][3] = -1;
      lastFreestyle = lastFreestyle - 1;
      freestyleCounter--;
      event.className = "disabledPixel";
      pixelarray[eventindex][0] = "D";
      clearArrows(event);
    } else if (freeStyle == 0) {
      event.className = "disabledPixel";
      pixelarray[eventindex][0] = "D";
      clearArrows(event);
    }
  } else if (pixelarray[eventindex][0] == "D") {
    event.className = "ledpixel";
    pixelarray[eventindex][0] = "E";
    drawArrows();
    if (freeStyle == 1) {
      pixelarray[eventindex][3] = freestyleCounter;
      lastFreestyle = freestyleCounter;
      freestyleCounter++;
    }
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
    if (pixelarray[i][0] == "E" && freeStyle != 1) {
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
            if (gaps == 1) {
              pixelarray[ledpos][2] = 1;
              activeLEDs++;
            } else if (freeStyle == 1) {
              pixelarray[ledpos][2] = pixelarray[ledpos][3];
            } else {
              pixelarray[ledpos][2] = activeLEDs;
              activeLEDs++;
            }
        } else {
          if (pixelarray[ledpos][0] == "D" ) {
            if (wled == 1 || gaps == 1 || freeStyle == 1) {
              if (gaps == 1 && discardP == 0) {
                pixelarray[ledpos][2] = 0;
              } else if (discardP == 1 || freeStyle == 1) {
                pixelarray[ledpos][2] = -1;
              } else {
                pixelarray[ledpos][2] = inactiveLEDs;
                inactiveLEDs++;
              }
            } else {
              pixelarray[ledpos][2] = inactiveLEDs;
              inactiveLEDs++;
            }
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
  var currentPixel = 0;
  var activeLEDcount = countActiveLEDs();

  if (discardP == 1) {
    var visibleLEDs = activeLEDcount;
  } else {
    var visibleLEDs = xdim * ydim;
  }

  var numleds = visibleLEDs + 1;
  var frameRate = (((1000 / ((numleds * 30) / 1000)) - 0.5) * pout).toFixed(0);
  
  mapDiv = document.getElementById("infoOut");

  mapHTML = "";
  mapHTML += '<PRE>';  
  if (fastled == 1) {
    if (discardP == 1) {
      mapHTML += '// XY mapping function discarding unchecked pixel data.<BR>';
      mapHTML += '// Requires ' + (numleds * 3) + ' Bytes\'s of SRAM';
      mapHTML += ' and ' + ((numleds * 30) / 1000) + ' ms/frame for WS2811 based LEDs.<BR>';
      mapHTML += '// You are saving ' + ((((xdim * ydim) + 1) - numleds) * 3) + ' Bytes\'s of SRAM';
      mapHTML += ' and ' + ((((((xdim * ydim) + 1) * 30) / 1000) - ((numleds * 30) / 1000)).toFixed(2)) + ' ms/frame for WS2811 based LEDs.<BR>';
    } else {
      mapHTML += '// XY mapping function preserving all pixel data.<BR>';
      mapHTML += '// Requires ' + (numleds * 3) + ' Bytes\'s of SRAM';
      mapHTML += ' and ' + ((numleds * 30) / 1000) + ' ms/frame for WS2811 based LEDs.<BR>';
      mapHTML += '// You COULD save ' + ((numleds - (activeLEDcount + 1)) * 3) + ' Bytes\'s of SRAM';
      mapHTML += ' and ' + (((((numleds * 30) / 1000)) - (((activeLEDcount + 1) * 30) / 1000)).toFixed(2)) + ' ms/frame for WS2811 based LEDs.<BR>';
    }
    if (pout > 1) {
      mapHTML += '// Maximum frame rate for WS2811 based LEDs = ' + frameRate + ' FPS using ' + pout + ' parallel outputs.<BR>';
      mapHTML += '// Connect LEDs every ' + Math.ceil((activeLEDcount / pout)) + ' LEDs for ' + pout + ' way parallel output.<BR>';
    } else {
      mapHTML += '// Maximum frame rate for WS2811 based LEDs = ' + frameRate + ' FPS using 1 output.<BR>';
    }
    if (wrapX == 1) {
      mapHTML += '// Cylindrical wrapping enabled.<BR>';
    }
    mapHTML += '// Wired in ' + wiringVert + ' ' + wiringSerp + ' layout starting at the ' + wiringVFlip + ' ' + wiringHFlip + ' corner.';
  } else if (wled == 1) {
    mapHTML += '// wLED ledmap.json file.<BR>';
    mapHTML += "// 2D matrix settings in wLED must be Horizontal starting in the TOP LEFT (NO serpentine) regardless of your actual layout.<BR>";
    mapHTML += '// Wired in ' + wiringVert + ' ' + wiringSerp + ' layout starting at the ' + wiringVFlip + ' ' + wiringHFlip + ' corner.<BR>';
    mapHTML += '// ' + activeLEDcount + ' LEDs visible out of ' + (xdim * ydim) + '<BR><BR>';
    mapHTML += '// Copy the entire array below, including the outer braces{}';
  } else {
    mapHTML += '// wLED 2d-gaps.json file.<BR>';
    if (freeStyle == 1) {
      mapHTML += '// Wired freestyle following the order clicked.<BR>';
    } else {
      mapHTML += '// Wired in ' + wiringVert + ' ' + wiringSerp + ' layout starting at the ' + wiringVFlip + ' ' + wiringHFlip + ' corner.<BR>';
    }
    mapHTML += '// ' + activeLEDcount + ' LEDs visible out of ' + (xdim * ydim) + '<BR><BR>';
    mapHTML += '// Copy the entire array below, including the brackets[]';
  }
  mapHTML += '</PRE>';

  mapDiv.innerHTML = mapHTML;

  mapDiv = document.getElementById("result");

  mapHTML = "";
  ledindex = 0;
  mapHTML += '<PRE>';
  if (fastled == 1) {
    mapHTML += '// Parameters for width and height<BR>';
    mapHTML += '#define MATRIX_WIDTH ' + xdim + '<BR>';
    mapHTML += '#define MATRIX_HEIGHT ' + ydim + '<BR><BR>';
  
    mapHTML += '#define NUM_LEDS ' + visibleLEDs + '';
    mapHTML += '	// ' + activeLEDcount + ' LEDs visible out of ' + (xdim * ydim) + '<BR><BR>';
  
    mapHTML += 'CRGB leds[' + numleds + '];';
    if (discardP == 1) {
      mapHTML += '	// 1 extra pixel for hiding discarded and out of bounds data<BR><BR>';
    } else {
      mapHTML += '	// 1 extra pixel for hiding out of bounds data<BR><BR>';
    }
  
    if (wrapX == 1) {
      mapHTML += '// Wrap function used by XY function and frame buffers<BR>';
      mapHTML += 'int wrapX(int x) {<BR>';
      mapHTML += '	if (x >= MATRIX_WIDTH) { return x - MATRIX_WIDTH; }<BR>	else if (x < 0) { ';
      mapHTML += 'return MATRIX_WIDTH - abs(x); }<BR>	else { return x; }<BR>}<BR><BR>';
    }
  
    if (visibleLEDs < 256) {
      mapHTML += 'uint8_t XY ';
    } else {
      mapHTML += 'uint16_t XY ';
    }
  
    if (xdim < 256 && ydim < 256) {
      mapHTML += '(uint8_t x, uint8_t y, bool wrap = false) {<BR>';
    } else {
      mapHTML += '(uint16_t x, uint16_t y, bool wrap = false) {<BR>';
    }
  
    if (wrapX == 1) {
      mapHTML += '	// Wrap X around for use on cylinders<BR>	if (wrap) { x = wrapX(x); }<BR><BR>';
    }
  
    mapHTML += '	// map anything outside of the matrix to the extra hidden pixel<BR>'
    mapHTML += '	if (x >= MATRIX_WIDTH || y >= MATRIX_HEIGHT) { return ' + visibleLEDs + '; }<BR><BR>';
  
    if (visibleLEDs < 256) {
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

  } else if (wled == 1 || freeStyle == 1) {
    mapHTML += '{"n":"matrix","map":[<BR>';
      for (x = 0; x < num_leds; x++) {
        if (freeStyle == 1) {
          if (pixelarray[ledindex][3] >= 0) {
            mapHTML += pad('   ', pixelarray[ledindex][3], true);
          } else {
            mapHTML += pad('   ', -1, true);
          }
        } else {
          mapHTML += pad('   ', pixelarray[ledindex][2], true);
        }
        ledindex++;
        if (ledindex < num_leds) mapHTML += ",";
        if ((x+1) % xdim === 0) mapHTML += '<BR>';
      }
    mapHTML += ']}</PRE>';
    
  } else {
    mapHTML += '[<BR>';
      for (x = 0; x < num_leds; x++) {
        mapHTML += pad('  ', pixelarray[ledindex][2], true);
        ledindex++;
        if (ledindex < num_leds) mapHTML += ",";
        if ((x+1) % xdim === 0) mapHTML += '<BR>';
      }
    mapHTML += ']</PRE>';
  }

  mapDiv.innerHTML = mapHTML;
}

window.onload = buildGrid;
