import * as core from "./core";

export default function reducer(state, action) {
    const {type, data} = action
    switch (type) {
        case 'UPDATE_NUMBER_OF_PLAYERS':
            return core.updateNumberOfPlayers(state, data);
        case 'ADD_PLAYER':
            return core.addPlayer(state);
        case 'REMOVE_PLAYER':
            return core.removePlayer(state);
        case 'SET_NUMBER_OF_PLAYERS':
            return core.setNumberOfPlayers(state, data);
        default:
            throw new Error();
    }
}
