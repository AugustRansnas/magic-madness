export function createInitialState() {
    return {
        numberOfPlayers: 0,
        players: [
            {life: 40, id: 1},
            {life: 40, id: 2},
        ]
    }
}

export function addPlayer(state) {
    return state;
}

export function removePlayer(state) {
    return state;
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

export function updateNumberOfPlayers(state, numberOfPlayers) {
    return {...state, numberOfPlayers}
}

