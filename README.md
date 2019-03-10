**Soduko-Solver**

Summary
=======

This is an implementation of a solver for the popular Soduku puzzle,
developed for pedagogical purposes. The application is written in HTML
with Javascript.

Program Explanation
===================

The core algorithm currently evaluates each square of the solution,
which is initially the same as the input puzzle. For each square,
it checks which numbers (1-9 inclusive) are available for use based
on the corresponding row, column, and 3x3 block. If the interesection
of these options reduces to a single option, the solution is updated
for that square. This algorithm is iterated over the puzzle until an
iteration no longer results in a change to the solution.

Executing
=========

Open sudoku-solver.html in a web browser.

Author
======

Name: Steven Joshua Klickermann
Email: sjklickermann@gmail.com

License
=======

This project is licensed under the terms of the GNU General Public
License v3.0 (see LICENSE.md).
