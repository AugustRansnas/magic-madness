export function createInitialState() {
    return {
        players: [
            {life: 40, id: 1},
            {life: 40, id: 2},
        ]
    }
}

export function setNumberOfPlayers(state, numOfPlayers) {
    return {
        ...state,
        players: Array.from({length: numOfPlayers}, (_, i) => i + 1)
            .map((num) => (
                {life: 40, id: num}
            ))
    }
}

export function getNumberOfPlayers(state) {
    return state.players.length
}

