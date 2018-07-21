import { deck, shuffle } from './createDeck'
import { checkCombos } from './checkCombos'
import { checkWinner } from './checkWinner'

export const flipCard = state => {
    const { enterAt, players } = state;

    console.log(state);

    if (!enterAt.deal) {
        const shuffledDeck = shuffle(deck);
        checkCombos(shuffledDeck, players);
        return { 
            ...state, enterAt: { ...enterAt, deal: true }, deck: shuffledDeck, currentlyActingPlayer: 0
        };

    } else if (enterAt.deal && !enterAt.flop) {
        return { 
            ...state, enterAt: { ...enterAt, flop: true }
        };

    } else if (enterAt.flop && !enterAt.turn) {
        return { 
            ...state, enterAt: { ...enterAt, turn: true }
        };

    } else if (enterAt.turn && !enterAt.river) {
        return { 
            ...state, enterAt: { ...enterAt, river: true }
        };
    } else if (enterAt.river && !enterAt.endgame) {
        return checkWinner(state);
    } else if (enterAt.endgame) {
        return { 
            ...state,
            summary: {
                show: false,
                winnerColor: null
            },
            enterAt: Object.assign({}, ...Object.keys(enterAt).map(key => ({
                [key]: false
            })))
        };
    } 
};