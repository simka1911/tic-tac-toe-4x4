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

const fullBoard = 0b1111111111111111;

export const findPossibleWinningCombination = (playedMove) => { 
    return winningMoves.filter(winningMove => { 
        return (winningMove & playedMove) === playedMove;
    });
}

export const checkWinAfterPlayedMove = (currentBoard, playedMove) => {
    let winningMove = 0;
    const possibleWinningMoves = findPossibleWinningCombination(playedMove);
    possibleWinningMoves.forEach(possibleWinningMove => {
        if ((currentBoard & possibleWinningMove) === possibleWinningMove) { 
            winningMove = possibleWinningMove;
        }
    });
    return winningMove;
}

export const checkWinBeforePlayedMove = (currentBoard) => {
    let willPlayerWin = 0;
     for (let possibleWinningMove of winningMoves) {
        if ((currentBoard & possibleWinningMove) === possibleWinningMove) { 
            willPlayerWin = possibleWinningMove;
            break;
        }
    };
    return willPlayerWin;
}

export const checkTie = (board) => {
    return ((board & fullBoard) === fullBoard);
}

export const evaluateBoard = (currentBoard, otherBoard) => { 
    let totalValue = 0;
    for (let possibleWinningMove of winningMoves) { 
        const currentValue = countBits(possibleWinningMove & currentBoard);
        const otherValue = countBits(possibleWinningMove & otherBoard); // should be 0 in best case

        if (otherValue === 0 && currentValue === 4) totalValue += 1000;
        else if (otherValue === 0 && currentValue === 3) totalValue += 100;
        else if (otherValue === 0 && currentValue === 2) totalValue += 10;
        else if (otherValue === 0 && currentValue === 1) totalValue += 1;
        // else if (otherValue === 4 && currentValue === 0) totalValue -= 1000;
        // else if (otherValue === 3 && currentValue === 0) totalValue -= 100;
        // else if (otherValue === 2 && currentValue === 0) totalValue -= 10;
        // else if (otherValue === 1 && currentValue === 0) totalValue -= 1;
    }
    return totalValue;
}

const countBits = (number) => { 
    return number && number.toString(2).match(/1/g).length;
}