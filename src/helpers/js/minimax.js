import { checkWinBeforePlayedMove, evaluateBoard } from './winningMoves';

let computerMoveField = 0;

export const computerMove = (boardOne, boardTwo) => {
    const board = boardOne | boardTwo;
    computerMoveField = 0;
    minimaxWithAlphaBetaPruning(board, boardOne, boardTwo, 0, 4, true, -Infinity, Infinity);
    return computerMoveField || 0;
}

export const minimaxWithAlphaBetaPruning = (board, boardOne, boardTwo, depth, maxDepth, isComputerPlayer, alpha, beta) => {
    if (checkWinBeforePlayedMove(isComputerPlayer ? boardTwo : boardOne) || maxDepth === depth) {
        return evaluate(isComputerPlayer, depth, null, boardOne, boardTwo);
    }

    let bestMove = null;
    let bestResult = isComputerPlayer ? -Infinity : +Infinity;

    const possibleMoves = getPossibleMoves(board).sort((a, b) => {return 0.5 - Math.random()});

    if (!possibleMoves.length) return 0;

    for (let currentPossibleMove of possibleMoves) {
        
        const newBoard = (currentPossibleMove | board);
        const newBoardOne = isComputerPlayer ? boardOne : (currentPossibleMove | boardOne);
        const newBoardTwo = isComputerPlayer ? (currentPossibleMove | boardTwo) : boardTwo;
        const returnedResult = minimaxWithAlphaBetaPruning(newBoard, newBoardOne, newBoardTwo,  depth + 1, maxDepth, !isComputerPlayer, alpha, beta);
        
        if (isComputerPlayer) {
            if (returnedResult > bestResult) {
                bestResult = returnedResult;
                bestMove = currentPossibleMove;
            }
            if (bestResult > alpha) { 
                alpha = bestResult;
                if (depth === 0) {
                    computerMoveField = bestMove;
                }
            }
            if (alpha >= beta) {
                bestResult = alpha;
                break;
            }
        }

        else { 
            if (returnedResult < bestResult) {
                bestResult = returnedResult;
                bestMove = currentPossibleMove;
            }
            if (bestResult < beta) { 
                beta = bestResult;
                if (depth === 0) { 
                    computerMoveField = bestMove;
                }
            } 
            if (beta <= alpha) {
                bestResult = beta;
                break;
            }
            
        }
    };
    
    return bestResult;
}

const getPossibleMoves = (board) => {
    const possibleMoves = [];
    for (let i = 0; i < 16; i++) { 
        if ((board & Math.pow(2, i)) === 0) { 
            possibleMoves.push(Math.pow(2, i));
        }
    }
    return possibleMoves;
}

const evaluate = (isComputerPlayer, depth, move, boardOne, boardTwo) => {
    if (isComputerPlayer) {
        return evaluateBoard(boardTwo, boardOne) - depth;
    }
    else { 
        return depth - evaluateBoard(boardOne, boardTwo);
    }
}