import * as core from "./core";

export default function reducer(state, action) {
    const {type, data} = action
    switch (type) {
        case 'SET_NUMBER_OF_PLAYERS':
            return core.setNumberOfPlayers(state, data);
        case 'ADD_DMG':
            return core.addDmg(state, data);
        case 'SUBTRACT_DMG':
            return core.subtractDmg(state, data);
        case 'TOGGLE_MENU':
            return core.toggleMenu(state);
        case 'SET_MENU_ITEM':
            return core.setMenuItem(state, data);
        default:
            throw new Error();
    }
}
