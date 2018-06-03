export const handleBet = (state, action) => {
    const { amount, player } = action;
    const { pot, players } = state;
    const calculatedChips = player.playerChips - parseInt(amount, 10);

    if (calculatedChips < 0) {
        alert('ALL IN');
        return {
            ...state,
            pot: pot + player.playerChips,
            players: players.map((playerOld, index) => {
                if (playerOld.id === player.id) {
                    return {
                        ...playerOld,
                        playerChips: 0
                    };
                } else return playerOld;
            })
        };
    }
    return {
        ...state,
        pot: pot + parseInt(amount, 10),
        players: players.map((playerOld, index) => {
            if (playerOld.id === player.id) {
                return {
                    ...playerOld,
                    playerChips: calculatedChips
                };
            } else return playerOld;
        })
    };
};