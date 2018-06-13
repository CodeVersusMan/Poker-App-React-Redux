import { initState } from './setInitState'
import { handleBet } from './handleBet'
import { handleCall } from './handleCall'
import { foldCards } from './foldCards'
import { flipCard } from './flipCard'

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'NEXT_TURN':
            return flipCard(state);
        case 'MAKE_BET':
            return handleBet(state, action);
        case 'MAKE_CALL':
            return handleCall(state, action);
        case 'FOLD_CARDS':
            return foldCards(state, action);
        default:
            return state;
    }
};