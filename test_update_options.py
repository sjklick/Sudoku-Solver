puzzle = [['5', '3', '.', '.', '7', '.', '.', '.', '.'],
          ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
          ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
          ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
          ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
          ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
          ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
          ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
          ['.', '.', '.', '.', '8', '.', '.', '7', '9']]

row_options = [[True for option in range(9)] for row in range(9)]
column_options = [[True for option in range(9)] for column in range(9)]
block_options = [[[True for option in range(9)] for x in range(3)] for y in range(3)]
square_options = [[[True for option in range(9)] for column in range(9)] for row in range(9)]

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

print_puzzle(puzzle)
print('')
update_options(puzzle)
# Check row options
print('row_options:')
for row in range(9):
    print('row['+str(row)+']:', end=' ')
    for option in range(9):
        if row_options[row][option] == True:
            print(str(option+1), end=' ')
    print('')
print('')
# Check column options
print('column_options:')
for column in range(9):
    print('column['+str(column)+']:', end=' ')
    for option in range(9):
        if column_options[column][option] == True:
            print(str(option+1), end=' ')
    print('')
print('')
# Check block options
print('block options:')
for block_y in range(3):
    for block_x in range(3):
        print('block['+str(block_y)+']['+str(block_x)+']:', end=' ')
        for option in range(9):
            if block_options[block_y][block_x][option] == True:
                print(str(option+1), end=' ')
        print('')
print('')
# Check square options
print('square options:')
for row in range(9):
    for column in range(9):
        print('square['+str(row)+']['+str(column)+'[:', end=' ')
        for option in range(9):
            if square_options[row][column][option] == True:
                print(str(option+1), end= ' ')
        print('')
