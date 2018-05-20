export const makeBet = (amount, player) => ({
    type: 'MAKE_BET',
    amount,
    player
});
export const nextTurn = () => ({type: 'NEXT_TURN'});