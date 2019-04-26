var value_selection = 1;
var iteration_count;
var content_hidden = true;
var workerThread;

function initialize_site(event) {
    if (document.readyState == "complete") {
        let hidden_content, loader;
        hidden_content = document.getElementById("hidden-content");
        hidden_content.style.transition = "none";
        hidden_content.style.width = "0";
        hidden_content.style.height = "0";
        hidden_content.style.bottom = "0";
        hidden_content.style.right = "0";
		loader = document.getElementById("loader");
		loader.style.visibility = "hidden";
    }
}

function toggle_hidden_content() {
    var hidden_content;
    hidden_content = document.getElementById("hidden-content");
    if (content_hidden) {   
        content_hidden = false;   
        if (window.matchMedia("(orientation: portrait)").matches) {
            hidden_content.style.bottom = "calc(2*var(--square))";
            hidden_content.style.right = "0";
            hidden_content.style.width = "100vw";
            hidden_content.style.height = "calc(100vh - 2*var(--square))";
            hidden_content.style.transition = "height 0.5s ease-in-out";
        } else {
            hidden_content.style.bottom = "0";
            hidden_content.style.right = "calc(2*var(--square))";
            hidden_content.style.width = "calc(100vw - 2*var(--square))";
            hidden_content.style.height = "100vh";
            hidden_content.style.transition = "width 0.5s ease-in-out";
        }
    } else {
        content_hidden = true;
        if (window.matchMedia("(orientation: portrait)").matches) {
            hidden_content.style.bottom = "calc(2*var(--square))";
            hidden_content.style.right = "0";
            hidden_content.style.width = "100vw";
            hidden_content.style.height = "0";
            hidden_content.style.transition = "height 0.5s ease-in-out";
        } else {
            hidden_content.style.bottom = "0";
            hidden_content.style.right = "calc(2*var(--square))";
            hidden_content.style.width = "0";
            hidden_content.style.height = "100vh";
            hidden_content.style.transition = "width 0.5s ease-in-out";
        }
    }
}

function on_resize() {
    var hidden_content;
    hidden_content = document.getElementById("hidden-content");
    if (!content_hidden) {
        hidden_content.style.transition = "none";
        if (window.matchMedia("(orientation: portrait)").matches) {
            hidden_content.style.bottom = "calc(2*var(--square))";
            hidden_content.style.right = "0";
            hidden_content.style.width = "100vw";
            hidden_content.style.height = "calc(100vh - 2*var(--square))";
        } else {
            hidden_content.style.bottom = "0";
            hidden_content.style.right = "calc(2*var(--square))";
            hidden_content.style.width = "calc(100vw - 2*var(--square))";
            hidden_content.style.height = "100vh";
        }
    }
}

/* This callback is needed in case the orientation changed while the "About" panel is hidden.
Otherwise, the transition will start at a non-zero value if the button is pressed. */
function on_transition_end() {
    if (content_hidden) {
        var hidden_content;
        hidden_content = document.getElementById("hidden-content");
        hidden_content.style.width = "0";
        hidden_content.style.height = "0";
    }
}

document.addEventListener("readystatechange", initialize_site, false);
document.getElementById("hidden-content").addEventListener("transitionend", on_transition_end);

function value_select(value_button) {
    document.getElementsByClassName("value-button-selected")[0].className = "value-button-unselected";
    value_button.className = "value-button-selected";
    value_selection = parseInt(value_button.id);
}

function enter_value(sudoku_square) {
    if (sudoku_square.innerText == "") {
        sudoku_square.classList.add("init-value");
        sudoku_square.innerText = value_selection.toString();
    } else {
        sudoku_square.classList.remove("init-value");
        sudoku_square.innerText = "";
    }
}

function options_from_document() {
    var options, row, column, square, index, id_string, value;
    options = [];
    for (row=0; row<9; row++) {
        options[row] = [];
        for (column=0; column<9; column++) {
            options[row][column] = [];
        }
    }
    square = document.getElementsByClassName("sudoku-square");
    for (index=0; index<9*9; index++) {
        id_string = square[index].id;
        row = parseInt(id_string[0]);
        column = parseInt(id_string[2]);
        if (square[index].innerText == "") {
            for (value=1; value<10; value++) {
                options[row][column].push(value.toString());
            }
        } else {
            options[row][column].push(square[index].innerText);
        }
    }
    return options;
}

function options_to_document(options) {
    var row, column, square, index, id_string;
    square = document.getElementsByClassName("sudoku-square");
    for (index=0; index<9*9; index++) {
        id_string = square[index].id;
        row = parseInt(id_string[0]);
        column = parseInt(id_string[2]);
        if (options[row][column].length == 1) {
            square[index].innerText = options[row][column][0];
        } else {
            square[index].innerText = "?";
        }
    }
}

function solve_button_pressed() {
	let loader, options;
	loader = document.getElementById("loader");
    loader.style.visibility = "visible";
	workerThread = new Worker('solver-engine.js');
	workerThread.addEventListener('message', function(e) {
		if (e.data != null) {
			options_to_document(e.data);
			let button, status, statusSymbol;
			status = document.getElementById("status");
			status.innerText = "Solution found!";
			button = document.getElementById("button-cancel-view");
			button.innerText = "View";
			statusSymbol = document.getElementById("status-symbol");
			statusSymbol.classList.remove("load-animation");
			statusSymbol.classList.remove("edit-animation")
			statusSymbol.classList.add("view-animation");
			statusSymbol.innerText = "\u2713";
		} else {
			let button, status, statusSymbol;
			status = document.getElementById("status");
			status.innerText = "Invalid puzzle.";
			button = document.getElementById("button-cancel-view");
			button.innerText = "Edit";
			statusSymbol = document.getElementById("status-symbol");
			statusSymbol.classList.remove("load-animation");
			statusSymbol.classList.remove("view-animation")
			statusSymbol.classList.add("edit-animation");
			statusSymbol.innerText = "\u2715";
		}
    }, false);
	options = options_from_document();
	workerThread.postMessage(options);
}

function clear_button_pressed() {
	let sudoku_square = document.getElementsByClassName("sudoku-square");
    let square_index;
    for (square_index=0; square_index< 9*9; square_index++) {
        sudoku_square[square_index].innerText = "";
        sudoku_square[square_index].classList.remove("init-value");
    }
}

function cancel_view_button_pressed(button) {
	let loader, status, statusSymbol;
	if (button.innerText === "Cancel") {
		workerThread.terminate();
	} else {
		button.innerText = "Cancel";
	}
	loader = document.getElementById("loader");
    loader.style.visibility = "hidden";
	status = document.getElementById("status");
	status.innerText = "Solving...";
	statusSymbol = document.getElementById("status-symbol");
	statusSymbol.classList.remove("view-animation");
	statusSymbol.classList.remove("edit-animation")
	statusSymbol.classList.add("load-animation");
	statusSymbol.innerText = "";
}
