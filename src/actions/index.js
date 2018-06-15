export const makeBet = (amount, player) => ({
    type: 'MAKE_BET',
    amount,
    player
});
export const makeCall = player => ({
    type: 'MAKE_CALL',
    player
});
export const foldCards = player => ({
    type: 'FOLD_CARDS',
    player
});
export const nextTurn = () => ({type: 'NEXT_TURN'});
export const hidePopUp = () => ({type: 'HIDE_POP_UP'});