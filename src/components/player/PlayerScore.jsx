import React, { useContext } from 'react';
import { AppContext } from '../../App';
import classnames from 'classnames';

import './player-score.scss';

export function PlayerScore(props) { 

    const gameState = useContext(AppContext);

    return (
        <div className={classnames("player-score",
            props.color === "red" && "player-score--red",
            props.color === "green" && "player-score--green",
            props.player === gameState.currentPlayer.toString() &&
                "player-score--color")}
        >
            <div className="player-score__text">
                {props.text}
            </div>
            <div className="player-score__value">
                {props.score}
            </div>
        </div>
    );
}