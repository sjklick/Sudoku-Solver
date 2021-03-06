function get_row_options(options) {
    var row_options, row, column, index, value;
    row_options = [];
    for (row=0; row<9; row++) {
        row_options[row] = [];
        for (value=1; value<10; value++) {
            row_options[row].push(value.toString());
        }
    }
    for (row=0; row<9; row++) {
        for (column=0; column<9; column++) {
            if (options[row][column].length == 1) {
                value = options[row][column][0];
                for (index=0; index<row_options[row].length; index++) {
                    if (row_options[row][index] == value) {
                        row_options[row].splice(index, 1);
                    }
                }
            }
        }
    }
    return row_options;
}

function get_column_options(options) {
    var column_options, row, column, index, value;
    column_options = [];
    for (column=0; column<9; column++) {
        column_options[column] = [];
        for (value=1; value<10; value++) {
            column_options[column].push(value.toString());
        }
    }
    for (column=0; column<9; column++) {
        for (row=0; row<9; row++) {
            if (options[row][column].length == 1) {
                value = options[row][column][0];
                for (index=0; index<column_options[column].length; index++) {
                    if (column_options[column][index] == value) {
                        column_options[column].splice(index, 1);
                    }
                }
            }
        }
    }
    return column_options;
}

function get_block_options(options) {
    var block_options, row, column, block_row, block_column;
    block_options = [];
    for (block_row=0; block_row<3; block_row++) {
        block_options[block_row] = [];
        for (block_column=0; block_column<3; block_column++) {
            block_options[block_row][block_column] = [];
            for (value=1; value<10; value++) {
                block_options[block_row][block_column].push(value.toString());
            }
        }
    }
    for (row=0; row<9; row++) {
        for (column=0; column<9; column++) {
            if (options[row][column].length == 1) {
                value = options[row][column][0];
                block_row = Math.trunc(row/3);
                block_column = Math.trunc(column/3);
                for (index=0; index<block_options[block_row][block_column].length; index++) {
                    if (block_options[block_row][block_column][index] == value) {
                        block_options[block_row][block_column].splice(index, 1);
                    }
                }
            }
        }
    }
    return block_options;
}

function is_row_option(row_options, row, value) {
    var index, is_option;
    is_option = false;
    for (index=0; index<row_options[row].length; index++) {
        if (row_options[row][index] == value) {
            is_option = true;
            break;
        }
    }
    return is_option;
}

function is_column_option(column_options, column, value) {
    var index, is_option;
    is_option = false;
    for (index=0; index<column_options[column].length; index++) {
        if (column_options[column][index] == value) {
            is_option = true;
            break;
        }
    }
    return is_option;
}

function is_block_option(block_options, row, column, value) {
    var block_row, block_column;
    is_option = false;
    block_row = Math.trunc(row/3);
    block_column = Math.trunc(column/3);
    for (index=0; index<block_options[block_row][block_column].length; index++) {
        if (block_options[block_row][block_column][index] == value) {
            is_option = true;
            break;
        }
    }
    return is_option;
}

function update_options(options) {
    var row, column, index, value, row_options, column_options, block_options;
    var row_opt, col_opt, blk_opt, modified;
    modified = false;
    row_options = get_row_options(options);
    column_options = get_column_options(options);
    block_options = get_block_options(options);
    for (row=0; row<9; row++) {
        for (column=0; column<9; column++) {
            if (options[row][column].length > 1) {
                for (value=1; value<10; value++) {
                    row_opt = is_row_option(row_options, row, value.toString());
                    col_opt = is_column_option(column_options, column, value.toString());
                    blk_opt = is_block_option(block_options, row, column, value.toString());
                    if (!(row_opt && col_opt && blk_opt)) {
                        for (index=0; index<options[row][column].length; index++) {
                            if (options[row][column][index] == value.toString()) {
                                options[row][column].splice(index, 1);
                                modified = true;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    return modified;
}

function is_dead_end(options) {
    var row, column;
    for (row=0; row<9; row++) {
        for (column=0; column<9; column++) {
            if (options[row][column].length == 0) {
                return true;
            }
        }
    }
    return false;
}

function is_complete(options) {
    var row, column;
    for (row=0; row<9; row++) {
        for (column=0; column<9; column++) {
            if (options[row][column].length > 1) {
                return false;
            }
        }
    }
    return true;
}

function deep_copy_options(options) {
    var options_copy, row, column, index, value;
    options_copy = [];
    for (row=0; row<9; row++) {
        options_copy[row] = [];
        for (column=0; column<9; column++) {
            options_copy[row][column] = [];
            for (index=0; index<options[row][column].length; index++) {
                options_copy[row][column][index] = options[row][column][index];
            }
        }
    }
    return options_copy;
}

function is_valid_row(row, options) {
    var column, choices, index, value;
    choices = [];
    for (column=0; column<9; column++) {
        if (options[row][column].length == 1) {
            value = options[row][column][0];
            for (index=0; index<choices.length; index++) {
                if (choices[index] == value) {
                    return false;
                }
            }
            choices.push(value);
        }
    }
    return true;
}

function is_valid_column(column, options) {
    var row, choices, index, value;
    choices = [];
    for (row=0; row<9; row++) {
        if (options[row][column].length == 1) {
            value = options[row][column][0];
            for (index=0; index<choices.length; index++) {
                if (choices[index] == value) {
                    return false;
                }
            }
            choices.push(value);
        }
    }
    return true;
}

function is_valid_block(block_row, block_column, options) {
    var row, column, choices, index, value;
    choices = [];
    for (row=block_row*3; row<block_row*3+3; row++) {
        for (column=block_column*3; column<block_column*3+3; column++) {
            if (options[row][column].length == 1) {
                value = options[row][column][0];
                for (index=0; index<choices.length; index++) {
                    if (choices[index] == value) {
                        return false;
                    }
                }
                choices.push(value);
            }
        }
    }
    return true;
}

function is_valid(options) {
    var row, column, block_row, block_column;
    for (row=0; row<9; row++) {
        if (!is_valid_row(row, options)) return false;
    }
    for (column=0; column<9; column++) {
        if (!is_valid_column(column, options)) return false;
    }
    for (block_row=0; block_row<3; block_row++) {
        for (block_column=0; block_column<3; block_column++) {
            if (!is_valid_block(block_row, block_column, options)) return false;
        }
    }
    return true;
}

function recursive_solve(options) {
    var row, column, keep_iterating, index, temp_options, value;

    /* Reduce options as much as possible using basic soduko rules. */
    keep_iterating = true;
    while (keep_iterating) {
        keep_iterating = update_options(options);
    }
    /* Don't keep going previous choices resulted in a dead end. */
    if (is_dead_end(options)) {
        return null;
    }
    /* Check if the puzzle grid is completely filled. */
    if (is_complete(options)) {
        if (is_valid(options)) {
            return options;
        } else {
            return null;
        }
    }
    /* Select the first square with multiple options. */
    for (row=0; row<9; row++) {
        for (column=0; column<9; column++) {
            if (options[row][column].length > 1) {
                /* For each option in the square, call this function using
                each possible option. Work on a copy of the options. */
                for (index=0; index<options[row][column].length; index++) {
                    value = options[row][column][index];
                    temp_options = deep_copy_options(options);
                    temp_options[row][column] = [];
                    temp_options[row][column].push(value);
                    temp_options = recursive_solve(temp_options);
                    /* Check if the solution was found. */
                    if (temp_options != null) {
                        return temp_options;
                    }
                }
                /* If the puzzle is valid, should never get here, but just in case... */
                return null;
            }
        }
    }
}

function is_empty(options) {
    for (row=0; row<9; row++) {
        for (column=0; column<9; column++) {
            if (options[row][column].length != 9) return false;
        }
    }
    return true;
}

self.addEventListener('message', function(e) {
    if (is_empty(e.data) || !is_valid(e.data)) options = null;
    else options = recursive_solve(e.data);
	self.postMessage(options);
}, false);
