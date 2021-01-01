import React, { useContext } from 'react';
import { Field } from '../field/Field';
import { AppContext } from '../../App';

import './board.scss';

export function Board() { 

     const gameState = useContext(AppContext);

    const fields = gameState.fields.map((field, index) => { 
        return <Field key={index} position={Math.pow(2, index)} index={ index } isPlayed={field.isPlayed} playedBy={field.playedBy} />
    });

    return (
        <div className="board">
            {fields}
        </div>
    );
}
