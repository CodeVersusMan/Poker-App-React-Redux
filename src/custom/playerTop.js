import React from 'react';
import Card from './card.js';
import '../table.css';

const Player2 = (props) => {
    return (
        <div className="player">
            < Card creatorResult={props.passedState.creatorResults[0]} interpret={props.interpret} styleProp={props.passedState.cardStyle[0]} classProp={props.passedState.deal} />
            < Card creatorResult={props.passedState.creatorResults[1]} interpret={props.interpret} styleProp={props.passedState.cardStyle[1]} classProp={props.passedState.deal} />
        </div>
    );
};

export default Player2;