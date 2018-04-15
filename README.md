# FastLED-XY-Map-Generator
Automatically generates XYmap function for irregular/gapped LED arrays.

Changes from original:
1) Uses define instead of const for Matrix size assignment and change variable name.
2) Uses one extra hidden pixel for writing out of bounds data to ensure all pixel data is preserved for use while shifting data.
3) Option to discard unwanted pixel data and write only to 1 hidden pixel. Reduces CGRB array by the amount of unused pixels reducing memory usage and reducing time required to write out data on call of FastLED.show.
4) Option to clear all pixel data and start with a blank grid. Good for sparse matrices with less pixels than empty space.
5) Remove unneeded variable assignments to reduce memory usage.

Try it here: https://intrinsically-sublime.github.io/FastLED-XY-Map-Generator/
