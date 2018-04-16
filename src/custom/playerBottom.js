import React from 'react';
import Card from './card.js';
import '../table.css';

const Player = (props) => {
    return (
        <div className="player">
            < Card creatorResult={props.passedState.creatorResults[7]} interpret={props.interpret} styleProp={props.passedState.cardStyle[7]} classProp={props.passedState.deal} />
            < Card creatorResult={props.passedState.creatorResults[8]} interpret={props.interpret} styleProp={props.passedState.cardStyle[8]} classProp={props.passedState.deal} />
        </div>
    );
};

export default Player;