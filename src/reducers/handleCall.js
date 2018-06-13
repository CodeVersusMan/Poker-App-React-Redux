export const handleCall = (state, action) => {
    const { player } = action;
    const { pot, players, betAmountThisRound } = state;
    
    const calculatedChips = player.playerChips - parseInt(betAmountThisRound, 10);
    if (calculatedChips <= 0) {
        alert('ALL IN');
        return {
            ...state,
            pot: pot + player.playerChips,
            players: players.map(playerOld => {
                if (playerOld.id === player.id) {
                    return { ...playerOld, playerChips: 0 };
                } else return playerOld;
            }),
            currentlyActingPlayer: player.id + 1
        };
    }
    return {
        ...state,
        pot: pot + parseInt(betAmountThisRound, 10),
        players: players.map(playerOld => {
            if (playerOld.id === player.id) {
                return { ...playerOld, playerChips: calculatedChips };
            } else return playerOld;
        }),
        currentlyActingPlayer: player.id + 1
    };
};