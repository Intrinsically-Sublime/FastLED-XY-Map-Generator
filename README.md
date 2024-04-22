# WLED and FastLED XY-Map-Generator

## WLED:
* 2d-gaps.json 
  * Normal mode allows 1 & 0 or 1 & -1 depending on the discard pixel option.
  * Tri-State allows 1, 0, or -1 regardless of the discard pixel option.
    * Recommend using Normal for the majority and then change to tri-state when needed to reduce the clicks needed.
* ledmap.json
  * Normal mode remaps the unchecked pixels in the array to -1 or the end of the array depending on the dicard pixel setting.
    * Normal mode uses all the other options
  * Freestyle mode ignores all options and allows you to select the pixels in any order you wish.
    * To undo a mistake you must retrace your steps backwards.
  * Two mapping modes available. Map the LED # to the Grid location or Map the Grid location to the LED #
    * If one doesn't work try the other?

## FastLED:
* Generates XY mapping function to be included in the FastLED config.

### Notes
* You can switch between modes without losing your layout. If you are using freestyle you must start with it from the beginning.
* You can export the same layout in every mode without having to redo it!

## Changes:
Changes from my previous version:
1) Add wLED ledmap.json output.
   * 2D matrix settings in wLED must be Horizontal starting in the TOP LEFT (NO serpentine) regardless of your actual layout.
2) Add wLED 2d-gaps.json output.
3) Add wLED freestyle ledmap.json option. You must start with an empty array.
4) Add wLED mapping mode options. Map the LED # to the Grid location or Map the Grid location to the LED #
5) Add wLED tri-State 2d-gaps.json option.

Changes from original:
1) Uses define instead of const int for Matrix size assignment and change variable name.
2) Uses one extra pixel for writing out of bounds data to ensure all pixel data is preserved for use while shifting data.
3) Option to discard unwanted pixel data and write only to 1 hidden pixel to save memory and increase frame rate.
4) Option to clear all pixel data and start with a blank grid. Good for sparse matrices with less pixels than empty space.
5) Remove unneeded variable assignments to reduce memory usage.
6) Calculate CRGB leds array SRAM usage.
7) Calculate frame rate for WS2811 based LEDs including parallel output.
8) Calculate connection points in matrix when using parallel output.
9) Wiring layout used to create function added to comments.
10) Add option to wrap around at ends for cylindrical matrices.

Try it here: https://intrinsically-sublime.github.io/FastLED-XY-Map-Generator/
