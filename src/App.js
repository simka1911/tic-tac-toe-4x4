import React, { useState, useEffect, useRef } from 'react';
import { PlayerScore } from './components/player/PlayerScore';
import { Board } from './components/board/Board';
import { initialFields } from './helpers/js/initialFields';
import { checkWinAfterPlayedMove, checkTie } from './helpers/js/winningMoves'
import { computerMove } from './helpers/js/minimax';
import { constants } from './helpers/js/constants';

import './App.scss';

export const AppContext = React.createContext({});

function App() {

  let computerTimer; // timer used for computer to give it some time to play field

  // all states are in the root component:
  const [playerOneScore, setPlayerOneScore] = useState(0); // total score of player 1 (user)
  const [playerTwoScore, setPlayerTwoScore] = useState(0); // total score of player 2 (computer)
  const [tieScore, setTieScore] = useState(0); // total number of tied games

  const [fields, setFields] = useState(initialFields); // initial fields of the board
  const [currentPlayer, setCurrentPlayer] = useState(Math.round(Math.random())); // 0 -> player 1 (user), 1 -> player 2 (computer)
  const [currentBoardStatePlayerOne, setCurrentBoardStatePlayerOne] = useState(0); // player 1 board (moves player 1 made on whole board)
  const [currentBoardStatePlayerTwo, setCurrentBoardStatePlayerTwo] = useState(0); // player 2 board (moves player 2 made on whole board)
  const [lastPlayedField, setLastPlayedField] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);
  const [victoryMessage, setVictoryMessage] = useState("");

  const isFirstRun = useRef(true);

  const restartGame = () => {
    clearTimeout(computerTimer);
    setVictoryMessage("");
    setFields(initialFields);
    setLastPlayedField(0);
    setIsGameWon(false);

    if (!currentBoardStatePlayerOne && !currentBoardStatePlayerTwo) { 
      setRandomPlayer();
    }

    else { 
      setCurrentBoardStatePlayerOne(0);
      setCurrentBoardStatePlayerTwo(0);
    }
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

  const computerPlay = () => {
    computerTimer = setTimeout(() => {
      const computerMoveField = computerMove(currentBoardStatePlayerOne, currentBoardStatePlayerTwo);
    for (let i = 0; i < 16; i++) { 
      if (Math.pow(2, i) === computerMoveField) { 
        updatefields(i, { isPlayed: true, playedBy: currentPlayer });
        updatePlayersBoard(computerMoveField);
      }
    }
    }, Math.floor(Math.random() * (1000 - 500 + 1) + 500));
  }

  const setRandomPlayer = () => { 
    const randomNewPlayer = Math.round(Math.random());
      if ((randomNewPlayer === currentPlayer) && currentPlayer) { 
        computerPlay();
      }
      else setCurrentPlayer(randomNewPlayer);
  }

  useEffect(() => {
    if (isFirstRun.current) { // don't execute on initial load
      isFirstRun.current = false;
      return;
    }
    if (!currentBoardStatePlayerOne && !currentBoardStatePlayerTwo) {
      setRandomPlayer();
      return;
    }
    const checkForWin = checkWinAfterPlayedMove(currentPlayer ? currentBoardStatePlayerTwo : currentBoardStatePlayerOne, lastPlayedField);
    if (checkForWin) {
      setIsGameWon(true);
      if (currentPlayer) {
        setPlayerTwoScore(playerTwoScore + 1)
        setVictoryMessage(constants.victoryMessageComputer);
      }
      else {
        setPlayerOneScore(playerOneScore + 1)
        setVictoryMessage(constants.victoryMessageUser);
      }
    }
    else if (checkTie(currentBoardStatePlayerTwo ^ currentBoardStatePlayerOne)) {
      setIsGameWon(true);
      setTieScore(tieScore + 1);
      setVictoryMessage(constants.victoryMessageTie);
    }
    else {
      setCurrentPlayer((currentPlayer + 1) % 2);
    }
  }, [currentBoardStatePlayerOne, currentBoardStatePlayerTwo]);

  useEffect(() => {
    if (currentPlayer) { // if player is computer execute it's code
      computerPlay(); 
    }
  }, [currentPlayer]);

  return (
    <div className="app">
      <div className="app__title">
        {constants.title}
      </div>
      <AppContext.Provider value={{ currentPlayer, updatePlayersBoard, fields, updatefields, isGameWon, victoryMessage }}>
        <Board />
        <div className="app__score">
          <PlayerScore color="red" player="0" text={constants.user} score={playerOneScore} />
          <PlayerScore text={constants.tie} score={tieScore} />
          <PlayerScore color="green" player="1" text={constants.computer} score={playerTwoScore} />
        </div>
        <div className="app__restart">
          <button
            onMouseDown={ev => ev.preventDefault()}
            onClick={restartGame}
          >
            {constants.restart}
          </button> 
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
