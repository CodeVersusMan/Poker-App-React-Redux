import React from 'react';
import { suits } from '../reducers/suitsAndValues'
import { playerColorList } from '../reducers/playerColorList'
const Card = ({ enterAt, value, suit, playerColors, fold, summary }) => {
    let classList = ['card'];
    let suitClass;

    enterAt ? classList.push('visible') : classList.push('invisible')

    if (suits[suit] === '\u2666') {
        suitClass = 'suit-red';
    } else if (suits[suit] === '\u2665') {
        suitClass = 'suit-red';
    } else {
        suitClass = 'suit-black';
    }

    if (fold) classList.push('folded-cards');

    return (
        <div className={classList.join(' ')}>
            <span>{value}</span>
            <span className={suitClass}>{suits[suit]}</span>
            <div className="matches">
                {playerColors.map((color, index) => {
                    if (summary.show && color !== playerColorList[summary.winnerColor] && color !== "purple") {
                        return <div key={index} className={"hide-block " + color}></div> 
                    }
                    return <div key={index} className={"match-block " + color}></div>
                })}
            </div>
        </div> 
    );
}

export default Card;