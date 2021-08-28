import * as core from "./core";

export default function reducer(state, action) {
    const {type, data} = action
    switch (type) {
        case 'SET_NUMBER_OF_PLAYERS':
            return core.setNumberOfPlayers(state, data);
        default:
            throw new Error();
    }
}
