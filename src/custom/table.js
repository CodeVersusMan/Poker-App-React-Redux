import React from 'react';
import Card from './card.js'
import Button from './button.js'
import '../table.css';

const Table = (props) => {
    
    return (
        <div className="round-table">
            < Card creatorResult={props.passedState.creatorResults[2]} interpret={props.interpret} styleProp={props.passedState.cardStyle[2]} classProp={props.passedState.flop} />
            
            < Card creatorResult={props.passedState.creatorResults[3]} interpret={props.interpret} styleProp={props.passedState.cardStyle[3]} classProp={props.passedState.flop} />
            
            < Card creatorResult={props.passedState.creatorResults[4]} interpret={props.interpret} styleProp={props.passedState.cardStyle[4]} classProp={props.passedState.flop} />
            
            < Card creatorResult={props.passedState.creatorResults[5]} interpret={props.interpret} styleProp={props.passedState.cardStyle[5]} classProp={props.passedState.turn} />
            
            < Card creatorResult={props.passedState.creatorResults[6]} interpret={props.interpret} styleProp={props.passedState.cardStyle[6]} classProp={props.passedState.river} />
            
            < Button flipCard={props.flipCard} />
        </div>
    ); 
};

export default Table;