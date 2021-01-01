import React, { useContext } from 'react';
import { AppContext } from '../../App';
import classnames from 'classnames';

import './field.scss';

export function Field(props) { 

    const gameState = useContext(AppContext);

    const handleFieldClick = (ev) => {
        gameState.updatefields(props.index, {isPlayed: true, playedBy: gameState.currentPlayer});
        gameState.updatePlayersBoard(props.position);
    }

    return (
        <div className="field">
            <div className="field__button-wrapper">
                <button
                    className={classnames("field__button",
                        props.isPlayed && "field__button--disabled",
                        props.playedBy === 1 && "field__button--player-2",
                        props.playedBy === 0 && "field__button--player-1")
                    }
                    onMouseDown={ev => ev.preventDefault()}
                    onClick={handleFieldClick}
                >
                </button>
            </div>
        </div>
    );
}