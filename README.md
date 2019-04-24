Soduko-Solver
=============

Try the [live demo](https://sjklick.github.io/Sudoku-Solver/)!

Summary
-------

This is an implementation of a solver for the popular Soduku puzzle,
developed as a learning exercise. The application is written with HTML,
CSS, and JavaScript.

Program Explanation
-------------------

This solver uses a recursive algorithm to try possible options until a solution
is found. At each iteration and each square, it checks which numbers (1-9 inclusive)
are available for use based on the corresponding row, column, and 3x3 block, and
updates the possible options accordingly. The number of iterations has a fixed limit
in order to quickly return control to the user if an invalid puzzle was entered.

Todo
----
- Add a loader with a cancel option while the puzzle is being solved
- Make it so that the puzzle solver pauses after a number of iterations
  - gives the interface a chance to update and respond to the user pressing cancel

Contact
-------

*Author*: Steven Joshua Klickermann\
*Email*: sjklickermann@gmail.com\
*GitHub*: https://github.com/sjklick

License
-------

This project is licensed under the terms of the GNU General Public
License v3.0 (see LICENSE.md).
