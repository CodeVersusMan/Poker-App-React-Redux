export const handleBet = (state, action) => {
    const { amount, player } = action;
    const { pot, players } = state;
    const calculatedChips = player.playerChips - parseInt(amount, 10);

    if (calculatedChips <= 0) {
        return {
            ...state,
            pot: pot + player.playerChips,
            players: players.map(playerOld => {
                if (playerOld.id === player.id) {
                    return { ...playerOld, playerChips: 0 };
                } else return playerOld;
            }),
            currentlyActingPlayer: player.id + 1,
            betAmountThisRound: amount,
            popUp: {
                show: true,
                payload: `${player.playerName} went all in`
            }
        };
    }
    return {
        ...state,
        pot: pot + parseInt(amount, 10),
        players: players.map(playerOld => {
            if (playerOld.id === player.id) {
                return { ...playerOld, playerChips: calculatedChips };
            } else return playerOld;
        }),
        currentlyActingPlayer: player.id + 1,
        betAmountThisRound: amount
    };
};