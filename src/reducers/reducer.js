import { initState } from './setInitState'
import { handleBet } from './handleBet'
import { flipCard } from './flipCard'

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'NEXT_TURN':
            return flipCard(state);
        case 'MAKE_BET':
            return handleBet(state, action);
        default:
            return state;
    }
};