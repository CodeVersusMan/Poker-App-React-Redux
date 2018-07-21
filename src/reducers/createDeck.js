import { values, suits } from './suitsAndValues'
const createDeck = () => {
    const deck = [];
    let deckIndex = 0;

    for (let i = 0; i < values.length; i++) {
        let SemanticStrength = i + 2;
        for (let j = 0; j < suits.length; j++) {
            deck[deckIndex] = {
                id: deckIndex,
                value: values[i],
                strength: SemanticStrength,
                suit: j,
                playerColors: []
            }
            deckIndex++;
        }
    }
    
    return deck;
}

export const shuffle = array => {
    for (let i = 0; i < array.length; i++) {
        array[i].playerColors = [];
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const deck = createDeck();