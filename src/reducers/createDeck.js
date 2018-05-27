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
                suit: suits[j],
                strength: SemanticStrength,
                suitVal: j,
                comboStatus: {
                    status: false,
                    playerColors: []
                }
            }
            deckIndex++;
        }
    }

    /*deck[2] = {
        id: 2,
        value: values[12],
        suit: suits[0],
        strength: 14,
        suitVal: 0,
        comboStatus: {
            status: false,
            playerColors: []
        }
    }
    deck[3] = {
        id: 3,
        value: values[11],
        suit: suits[0],
        strength: 13,
        suitVal: 0,
        comboStatus: {
            status: false,
            playerColors: []
        }
    }
    deck[12] = {
        id: 12,
        value: values[10],
        suit: suits[0],
        strength: 12,
        suitVal: 0,
        comboStatus: {
            status: false,
            playerColors: []
        }
    }
    deck[13] = {
        id: 13,
        value: values[9],
        suit: suits[0],
        strength: 11,
        suitVal: 0,
        comboStatus: {
            status: false,
            playerColors: []
        }
    }
    deck[14] = {
        id: 14,
        value: values[8],
        suit: suits[0],
        strength: 10,
        suitVal: 0,
        comboStatus: {
            status: false,
            playerColors: []
        }
    }
    deck[15] = {
        id: 15,
        value: values[0],
        suit: suits[1],
        suitVal: 2,
        strength: 3,
        comboStatus: {
            status: false,
            playerColors: []
        }
    }
    deck[16] = {
        id: 16,
        value: values[0],
        suit: suits[1],
        suitVal: 2,
        strength: 2,
        comboStatus: {
            status: false,
            playerColors: []
        }
    }*/

    return deck;
}

export const shuffle = array => {
    for (let i = 0; i < array.length; i++) {
        array[i].comboStatus = {
            status: false,
            playerColors: []
        }
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const deck = createDeck();