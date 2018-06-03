import React from 'react';
import Card from './Card'
import { ButtonContainer } from '../containers/ButtonContainer'
import { PotContainer } from '../containers/PotContainer'

const Table = ({deck, enterAt, players}) => {
    const startDeal = players.length * 2;
    const tableCards = deck.slice(startDeal, startDeal+5);
    return (
        <div className='table'>
            < PotContainer />
            <div className="cards-section">
                {tableCards.map((card, index) => {
                    let orderOfEntrance;
                    if (index <= 2) {
                        orderOfEntrance = enterAt.flop
                    }
                    if (index === 3) {
                        orderOfEntrance = enterAt.turn
                    }
                    if (index === 4) {
                        orderOfEntrance = enterAt.river
                    }
                    return (<Card key={card.id} {...card} enterAt={orderOfEntrance} />);
                })}
            </div> 
            < ButtonContainer />
        </div>
    );
} 
export default Table;