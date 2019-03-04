SODUKO SOLVER

---- Summary --------------------------------------------------------

This is an implementation of a solver for the popular Soduku puzzle,
developed for pedagogical purposes. The algorithm is prototyped in
Python 3.5.2, with the intent of translating the algorithm to a
javascript based web-solver.

---- Program Explanation --------------------------------------------

The core algorithm currently evaluates each square of the solution,
which is initially the same as the input puzzle. For each square,
it checks which numbers (1-9 inclusive) are available for use based
on the corresponding row, column, and 3x3 block. If the interesection
of these options reduces to a single option, the solution is updated
for that square. This algorithm is iterated over the puzzle until an
iteration no longer results in a change to the solution.

---- Executing ------------------------------------------------------

To run the main script from Bash:
$ python solver.py

To run the test script from Bash:
$ python test_update_options.py

Currently, the puzzle to be solved is contained in the 'puzzle'
variable in solver.py, and can be adjusted there before executing
the main script. test_update_options.py is used to visually inspect
the behaviour of an iteration of the update_options function, which
is the core of the algorithm.

---- Author ---------------------------------------------------------

Name: Steven Joshua Klickermann
Email: sjklickermann@gmail.com

---- License --------------------------------------------------------
