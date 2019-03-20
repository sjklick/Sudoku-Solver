**Soduko-Solver**

Summary
=======

This is an implementation of a solver for the popular Soduku puzzle,
developed for pedagogical purposes. The application is written in HTML,
CSS, and JavaScript.

Program Explanation
===================

This solver uses a recursive algorithm to try possible options until a solution
is found. At each iteration and each square, it checks which numbers (1-9 inclusive)
are available for use based on the corresponding row, column, and 3x3 block, and
updates the possible options accordingly. The number of iterations has a fixed limit
in order to quickly return control to the user if an invalid puzzle was entered.

Author
======

Name: Steven Joshua Klickermann
Email: sjklickermann@gmail.com
GitHub: https://github.com/sjklick

License
=======

This project is licensed under the terms of the GNU General Public
License v3.0 (see LICENSE.md).
