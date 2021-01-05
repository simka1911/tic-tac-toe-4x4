import React, { useState, useEffect, useRef } from 'react';
import { PlayerScore } from './components/player/PlayerScore';
import { Board } from './components/board/Board';
import { initialFields } from './helpers/js/initialFields';
import { checkWinAfterPlayedMove, checkTie } from './helpers/js/winningMoves'
import { computerMove } from './helpers/js/minimax';

import './App.scss';

export const AppContext = React.createContext({});

function App() {

  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [tieScore, setTieScore] = useState(0);

  const isFirstRun = useRef(true);

  const [fields, setFields] = useState(initialFields);
  const [currentPlayer, setCurrentPlayer] = useState(Math.round(Math.random())); // 0 -> player 1 (human), 1 -> player 2 (computer)
  const [currentBoardStatePlayerOne, setCurrentBoardStatePlayerOne] = useState(0);
  const [currentBoardStatePlayerTwo, setCurrentBoardStatePlayerTwo] = useState(0);
  const [lastPlayedField, setLastPlayedField] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);

  const restartGame = () => {
    setFields(initialFields);
    setLastPlayedField(0);
    setCurrentBoardStatePlayerOne(0);
    setCurrentBoardStatePlayerTwo(0);
    setIsGameWon(false);
    setCurrentPlayer(Math.round(Math.random()));
  }

  const updatefields = (fieldIndex, fieldValue) => {
    let items = [...fields];
    items[fieldIndex] = fieldValue;
    setFields(items);
  }

  const updatePlayersBoard = (playedField) => {
    setLastPlayedField(playedField);

    if (!currentPlayer) { // player 1 is on the move
      setCurrentBoardStatePlayerOne(currentBoardStatePlayerOne | playedField);
    }
    else { // player 2 is on the move
      setCurrentBoardStatePlayerTwo(currentBoardStatePlayerTwo | playedField);
    }
  }

  useEffect(() => {
    if (isFirstRun.current) { // don't execute on initial load
      isFirstRun.current = false;
      return;
    }
    if (!currentBoardStatePlayerOne && !currentBoardStatePlayerTwo) return;
    const checkForWin = checkWinAfterPlayedMove(currentPlayer ? currentBoardStatePlayerTwo : currentBoardStatePlayerOne, lastPlayedField);
    if (checkForWin) {
      setIsGameWon(true);
      currentPlayer ? setPlayerTwoScore(playerTwoScore + 1) : setPlayerOneScore(playerOneScore + 1);
      // restartGame();
    }
    else if (checkTie(currentBoardStatePlayerTwo ^ currentBoardStatePlayerOne)) {
      setIsGameWon(true);
      setTieScore(tieScore + 1);
      // restartGame();
    }
    else {
      setCurrentPlayer((currentPlayer + 1) % 2);
    }
  }, [currentBoardStatePlayerOne, currentBoardStatePlayerTwo]);

  useEffect(() => {
    if (currentPlayer) { // if player is computer execute minimax algorithm
       const computerMoveField = computerMove(currentBoardStatePlayerOne, currentBoardStatePlayerTwo);
       setTimeout(() => {
         for (let i = 0; i < 16; i++) { 
         if (Math.pow(2, i) === computerMoveField) { 
           updatefields(i, { isPlayed: true, playedBy: 1 });
           updatePlayersBoard(computerMoveField);
         }
       }
        }, 500)
     }
  }, [currentPlayer]);

  return (
    <div className="app">
      <div className="app__title">
        Tic-Tac-Toe 4x4
      </div>
      <AppContext.Provider value={{ currentPlayer, updatePlayersBoard, fields, updatefields, isGameWon }}>
        <Board />
        <div className="app__score">
          <PlayerScore color="red" player="0" text="User" score={playerOneScore} />
          <PlayerScore text="Ties" score={tieScore} />
          <PlayerScore color="green" player="1" text="Computer" score={playerTwoScore} />
        </div>
        <div className="app__restart">
          <button
            onMouseDown={ev => ev.preventDefault()}
            onClick={restartGame}
          >
            Restart Game
          </button> 
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
