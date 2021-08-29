import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useStore} from "../store/store";

export default function MenuItem() {
    const {state, dispatch} = useStore();
    return state.selectedMenuItem === 'selectNumberOfPlayers' ? (
        <View style={styles.menuItem}>
            <View style={styles.numOfPlayers}>
                {[2, 3, 4].map((numOfPlayers) =>
                    <TouchableOpacity key={numOfPlayers}
                                      onPress={() => {
                                          dispatch({type: 'SET_NUMBER_OF_PLAYERS', data: numOfPlayers})
                                          dispatch({type: 'SET_MENU_ITEM', data: null})
                                          dispatch({type: 'TOGGLE_MENU'})
                                      }
                                      }>
                        <Text style={styles.selectNumOfPlayers}>
                            {numOfPlayers}
                        </Text>
                    </TouchableOpacity>)
                }
            </View>
        </View>
    ) : null;
}

const styles = StyleSheet.create({
    menuItem: {
        position: 'absolute',
        top: '30%',
        left: '15%',
        height: '10%',
        width: '70%',
        backgroundColor: '#7a8486',
        borderRadius: 10,
        shadowColor: "#7a8486",
        shadowOffset: {
            width: 8,
            height: 5,
        },
        shadowOpacity: 0.6,
        shadowRadius: 5,
        elevation: 6,
    },
    numOfPlayers: {
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    selectNumOfPlayers: {
        padding: 10,
        fontSize: 50,
        fontWeight: 'bold'
    }
});