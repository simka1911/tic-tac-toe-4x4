export const winningMoves = [
    0b0000000000001111, // first row
    0b0000000011110000, // second row
    0b0000111100000000, // third row
    0b1111000000000000, // forth row
    0b0001000100010001, // first column
    0b0010001000100010, // second column
    0b0100010001000100, // third column
    0b1000100010001000, // forth column
    0b1000010000100001, // left diagonal
    0b0001001001001000, // right diagonal
    0b0000000000110011, // top left square
    0b0000000001100110, // top center square
    0b0000000011001100, // top right square
    0b0000001100110000, // middle left square
    0b0000011001100000, // middle center square
    0b0000110011000000, // middle right square
    0b0011001100000000, // bottom left square
    0b0110011000000000, // bottom center square
    0b1100110000000000, // bottom right square
];

export const findPossibleWinningCombination = (playedMove) => { 
    return winningMoves.filter(winningMove => { 
        return (winningMove & playedMove) === playedMove;
    });
}

export const checkWin = (currentBoard, playedMove) => { 
    const possibleWinningMoves = findPossibleWinningCombination(playedMove);
    possibleWinningMoves.forEach(possibleWinningMove => {
        if ((currentBoard & possibleWinningMove) === possibleWinningMove) { 
            // pronounce victory and return winning move
            console.log('Yaay, victory');
        }
        // else return nothing
     });
}