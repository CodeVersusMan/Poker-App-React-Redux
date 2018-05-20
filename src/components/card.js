import React from 'react';
const Card = ({enterAt, value, suit, comboStatus}) => {
    let classList = ['card'];
    let suitClass;

    enterAt ? classList.push('visible') : classList.push('invisible')

    if (suit === '\u2666') {
        suitClass = 'suit-red';
    } else if (suit === '\u2665') {
        suitClass = 'suit-red';
    } else {
        suitClass = 'suit-black';
    }

    return (
        <div className={classList.join(' ')}>
            <span>{value}</span>
            <span className={suitClass}>{suit}</span>
            <div className="matches">
                {comboStatus.playerColors.map((color, index) => {
                    return <div key={index} className={"match-block " + color}>

                    </div>
                })}
            </div>
        </div> 
    );
}

export default Card;