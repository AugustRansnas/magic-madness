import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useStore} from "../store/store";

export default function SelectNumberOfPlayers() {
    const {dispatch} = useStore();
    return (
        <View style={styles.numOfPlayers}>
            {[2, 3, 4].map((numOfPlayers) =>
                <TouchableOpacity key={numOfPlayers}
                                  onPress={() => {
                                      dispatch({type: 'SET_NUMBER_OF_PLAYERS', data: numOfPlayers})
                                      dispatch({type: 'SET_MENU_ITEM', data: null})
                                      dispatch({type: 'TOGGLE_MENU'})
                                  }
                                  }>
                    <Text style={styles.selectNumOfPlayers}>{numOfPlayers}</Text>
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