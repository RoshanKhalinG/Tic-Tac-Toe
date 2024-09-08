let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let gameBoard = document.querySelector(".game"); // For drawing the line

let turn0 = true; // Player X, Player O
let gameActive = true;

const winPatterns = [
    [0, 1, 2],  // Top row
    [0, 3, 6],  // Left column
    [0, 4, 8],  // Diagonal from top-left to bottom-right
    [1, 4, 7],  // Middle column
    [2, 5, 8],  // Right column
    [2, 4, 6],  // Diagonal from top-right to bottom-left
    [3, 4, 5],  // Middle row
    [6, 7, 8]   // Bottom row
];

const resetGame = () =>{
    turn0 = true
}
// Handle box click
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (gameActive && box.innerText === "") {
            box.innerText = turn0 ? "O" : "X";
            turn0 = !turn0;
            checkWinner();
        }
    });
});

// Show winner message
const showWinner = (winner, winningPattern) => {
    msg.innerText = `Congratulations, the Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    gameActive = false;

    drawWinningLine(winningPattern);
};

// Draw a line across the winning pattern
const drawWinningLine = (pattern) => {
    const line = document.createElement("div");
    line.classList.add("line");

    // Identify the start and end positions for the line based on the pattern
    let start = boxes[pattern[0]].getBoundingClientRect();
    let end = boxes[pattern[2]].getBoundingClientRect();

    // Calculate the center points of the start and end boxes
    let startX = (start.left + start.right) / 2;
    let startY = (start.top + start.bottom) / 2;
    let endX = (end.left + end.right) / 2;
    let endY = (end.top + end.bottom) / 2;

    // Set the position and angle of the line
    line.style.width = `${Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2)}px`;
    line.style.transform = `rotate(${Math.atan2(endY - startY, endX - startX)}rad)`;
    line.style.top = `${startY}px`;
    line.style.left = `${startX}px`;

    document.body.appendChild(line); // Append line to the body or game board
};

// Check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        let pos1Val = boxes[a].innerText;
        let pos2Val = boxes[b].innerText;
        let pos3Val = boxes[c].innerText;

        if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val, pattern);
            break;
        }
    }
};



// Reset the game
resetBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.classList.remove("win");
    });

    // Remove the line if it exists
    const line = document.querySelector(".line");
    if (line) {
        line.remove();
    }

    gameActive = true;
    turn0 = true;
    msgContainer.classList.add("hide");
});

// Start a new game
newGameBtn.addEventListener("click", () => {
    resetBtn.click();
});
