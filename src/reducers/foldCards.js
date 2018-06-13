export const foldCards = (state, action) => {
    const { player } = action;
    const { activePlayersThisRound, players } = state;

    return {
        ...state,
        activePlayersThisRound: activePlayersThisRound.filter(activePlayer => activePlayer.id !== player.id),
        players: players.map(playerMapped => {
            if (playerMapped.id === player.id) playerMapped.fold = true;
            return playerMapped;
        }),
        currentlyActingPlayer: player.id + 1
    };
};