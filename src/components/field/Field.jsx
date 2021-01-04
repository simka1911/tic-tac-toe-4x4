import React, { useContext } from 'react';
import { AppContext } from '../../App';
import classnames from 'classnames';

import './field.scss';

export function Field(props) { 

    const gameState = useContext(AppContext);

    const handleFieldClick = (ev) => {
        if (gameState.currentPlayer) return;
        gameState.updatefields(props.index, {isPlayed: true, playedBy: gameState.currentPlayer});
        gameState.updatePlayersBoard(props.position);
    }

    return (
        <div className="field">
            <div className="field__button-wrapper">
                <button
                    className={classnames("field__button",
                        (props.isPlayed || gameState.isGameWon || gameState.currentPlayer) && "field__button--disabled",
                        props.playedBy === 1 && "field__button--player-2",
                        props.playedBy === 0 && "field__button--player-1",
                        gameState.currentPlayer === 1 && "field__button--player-2-hover",
                        gameState.currentPlayer === 0 && "field__button--player-1-hover")
                    }
                    disabled={props.isPlayed || gameState.isGameWon || gameState.currentPlayer}
                    onMouseDown={ev => ev.preventDefault()}
                    onClick={handleFieldClick}
                >
                </button>
            </div>
        </div>
    );
}