# LED-XY-Map-Generator
Generates XYmap function for irregular/gapped LED arrays for FastLED.
Generates map array for wLED.

Changes from my previous version:
1) Add wLED array output.
   * 2D matrix settings in wLED must be Horizontal starting in the TOP LEFT (NO serpentine) regardless of your actual layout.

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
