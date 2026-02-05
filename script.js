// ========================================
// GAME STATE VARIABLES
// ========================================

// Array to store the game board state (9 cells)
// Empty string means cell is empty, 'X' or 'O' means cell is filled
let board = ['', '', '', '', '', '', '', '', ''];

// Track whose turn it is (X always starts first)
let currentPlayer = 'X';

// Track if game is still active
let gameActive = true;

// ========================================
// WINNING COMBINATIONS
// ========================================

// All possible winning combinations (rows, columns, diagonals)
const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
];

// ========================================
// DOM ELEMENTS
// ========================================

// Get all cell elements
const cells = document.querySelectorAll('.cell');

// Get status text element
const statusText = document.getElementById('status');

// Get restart button
const restartBtn = document.getElementById('restartBtn');

// ========================================
// INITIALIZE GAME
// ========================================

// Add click event listeners to all cells
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Add click event listener to restart button
restartBtn.addEventListener('click', restartGame);

// ========================================
// HANDLE CELL CLICK
// ========================================

function handleCellClick(event) {
    // Get the clicked cell
    const clickedCell = event.target;
    
    // Get the index of the clicked cell
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
    
    // If cell is already filled or game is not active, do nothing
    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }
    
    // Update the cell
    updateCell(clickedCell, clickedCellIndex);
    
    // Check for winner or draw
    checkResult();
}

// ========================================
// UPDATE CELL
// ========================================

function updateCell(cell, index) {
    // Update the board array
    board[index] = currentPlayer;
    
    // Display X or O in the cell
    cell.textContent = currentPlayer;
    
    // Add class for styling (x or o)
    cell.classList.add(currentPlayer.toLowerCase());
}

// ========================================
// CHECK RESULT (WIN OR DRAW)
// ========================================

function checkResult() {
    let roundWon = false;
    
    // Check all winning conditions
    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const a = board[condition[0]];
        const b = board[condition[1]];
        const c = board[condition[2]];
        
        // If any position is empty, skip this condition
        if (a === '' || b === '' || c === '') {
            continue;
        }
        
        // If all three positions have the same symbol, we have a winner
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    
    // If someone won
    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
        gameActive = false;
        return;
    }
    
    // Check for draw (all cells filled and no winner)
    const roundDraw = !board.includes('');
    if (roundDraw) {
        statusText.textContent = "It's a draw! 🤝";
        gameActive = false;
        return;
    }
    
    // If game continues, switch player
    changePlayer();
}

// ========================================
// CHANGE PLAYER
// ========================================

function changePlayer() {
    // Switch between X and O
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    
    // Update status text
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// ========================================
// RESTART GAME
// ========================================

function restartGame() {
    // Reset game state
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    
    // Update status text
    statusText.textContent = "Player X's Turn";
    
    // Clear all cells
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}
