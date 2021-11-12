import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useStore} from "../store/store";
import actions from '../store/actions'
import ExoText from "./buildingblocks/ExoText";

export default function SelectNumberOfPlayers({setIsMenuOpen}) {
    const {dispatch} = useStore();
    return (
        <View style={styles.numOfPlayers}>
            {[2, 3, 4].map((numOfPlayers) =>
                <TouchableOpacity key={numOfPlayers}
                                  onPress={() => {
                                      setIsMenuOpen(false);
                                      dispatch({type: actions.SET_NUMBER_OF_PLAYERS, data: numOfPlayers})
                                      dispatch({type: actions.SET_MENU_ITEM, data: null})
                                  }
                                  }>
                    <ExoText style={styles.selectNumOfPlayers}>{numOfPlayers}</ExoText>
                </TouchableOpacity>)
            }
        </View>
    );
}

const styles = StyleSheet.create({
    numOfPlayers: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-evenly',
    },
    selectNumOfPlayers: {
        padding: 10,
        fontSize: 50,
        fontWeight: 'bold',
    }
});