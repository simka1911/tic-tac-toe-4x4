import React, { useState, useEffect, useRef } from 'react';
import { Board } from './components/board/Board';
import { checkWin } from './helpers/js/winningMoves'

import './App.scss';

export const AppContext = React.createContext({});

const initialFields = [
  {
    isPlayed: false,
    playedBy: -1,
},
  {
    isPlayed: false,
    playedBy: -1,
},
  {
    isPlayed: false,
    playedBy: -1,
},
  {
    isPlayed: false,
    playedBy: -1,
},
  {
    isPlayed: false,
    playedBy: -1,
},
  {
    isPlayed: false,
    playedBy: -1,
},
  {
    isPlayed: false,
    playedBy: -1,
},
  {
    isPlayed: false,
    playedBy: -1,
},
  {
    isPlayed: false,
    playedBy: -1,
},
  {
    isPlayed: false,
    playedBy: -1,
},
  {
    isPlayed: false,
    playedBy: -1,
},
  {
    isPlayed: false,
    playedBy: -1,
},
  {
    isPlayed: false,
    playedBy: -1,
},
  {
    isPlayed: false,
    playedBy: -1,
},
  {
    isPlayed: false,
    playedBy: -1,
},
  {
    isPlayed: false,
    playedBy: -1,
},
];

function App() {

  const isFirstRun = useRef(true);

  const [fields, setFields] = useState(initialFields);
  const [currentPlayer, setCurrentPlayer] = useState(Math.round(Math.random())); // 0 -> player 1 (homan), 1 -> player 2 (computer)
  const [currentBoardStatePlayerOne, setCurrentBoardStatePlayerOne] = useState(0);
  const [currentBoardStatePlayerTwo, setCurrentBoardStatePlayerTwo] = useState(0);
  const [lastPlayedField, setLastPlayedField] = useState(0);

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
    checkWin(currentPlayer ? currentBoardStatePlayerTwo : currentBoardStatePlayerOne, lastPlayedField);
    setCurrentPlayer((currentPlayer + 1) % 2);
  }, [currentBoardStatePlayerOne, currentBoardStatePlayerTwo]);

   useEffect(() => {
     if (currentPlayer) { // if player is computer execute minimax

     }
  }, [currentPlayer]);

  return (
    <div className="app">
      <AppContext.Provider value={{ currentPlayer, updatePlayersBoard, fields, updatefields }}>
        { `player ${currentPlayer + 1} turn`}
        <Board />
      </AppContext.Provider>
    </div>
  );
}

export default App;
