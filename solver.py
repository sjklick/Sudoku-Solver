puzzle = [['5', '3', '.', '.', '7', '.', '.', '.', '.'],
          ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
          ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
          ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
          ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
          ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
          ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
          ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
          ['.', '.', '.', '.', '8', '.', '.', '7', '9']]

row_options = [[True for options in range(9)] for rows in range(9)]
column_options = [[True for options in range(9)] for columns in range(9)]
block_options = [[[True for options in range(9)] for y in range(3)] for x in range(3)]
square_options = [[[True for options in range(9)] for row in range(9)] for column in range(9)]

def print_puzzle(puzzle):
    for row in range(9):
        for column in range(9):
            print(puzzle[row][column], end=' ')
            if (column == 2) or (column == 5):
                print('|', end=' ')
        print('')
        if (row == 2) or (row == 5):
            print('------+-------+------')

def row_column_to_block(row, column):
    block_x = int(column/3)
    block_y = int(row/3)
    return (block_y, block_x)

def update_options(puzzle):
    # Update row options
    for row in range(9):
        for column in range(9):
            if puzzle[row][column] != '.':
                row_options[row][int(puzzle[row][column])-1] = False
    # Update column options
    for column in range(9):
        for row in range(9):
            if puzzle[row][column] != '.':
                column_options[column][int(puzzle[row][column])-1] = False
    # Update block options
    for block_y in range(3):
        for block_x in range(3):
            for row in range(3):
                for column in range(3):
                    if puzzle[3*block_y+row][3*block_x+column] != '.':
                        block_options[block_y][block_x][int(puzzle[3*block_y+row][3*block_x+column])-1] = False
    # Update square options
    for row in range(9):
        for column in range(9):
            if puzzle[row][column] == '.':
                for option in range(9):
                    block_y, block_x = row_column_to_block(row, column)
                    if (not row_options[row][option]) or (not column_options[column][option]) or (not block_options[block_y][block_x][option]):
                        square_options[row][column][option] = False
            else:
                for option in range(9):
                    square_options[row][column][option] = False
                square_options[row][column][int(puzzle[row][column])-1] = True

# Return True if the solution was modified.
def update_solution(puzzle):
    modified = False
    for row in range(9):
        for column in range(9):
            num_options = 0
            for option in range(9):
                if square_options[row][column][option] == True:
                    num_options += 1
            if num_options == 1:
                for option in range(9):
                    if square_options[row][column][option] == True:
                        if puzzle[row][column] == '.':
                            modified = True
                        puzzle[row][column] = str(option+1)
                        break
    return modified

print_puzzle(puzzle)
print('')
solution = puzzle
keep_iterating = True
while keep_iterating:
    update_options(solution)
    keep_iterating = update_solution(solution)
print_puzzle(solution)
