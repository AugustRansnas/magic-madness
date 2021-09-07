import React, {useRef, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as core from "../store/core";

export default function Damage({
                                   isRotated,
                                   addDmg,
                                   subtractDmg,
                                   showRecentDmg,
                                   hitPoints
                               }) {
    const {windowWidth, windowHeight} = core.getWindow();
    const [recentDmg, setRecentDmg] = useState(null);

    const timer = useRef(null);

    function doRecentDmg(fn) {
        clearTimeout(timer.current);
        fn()

        timer.current = setTimeout(function () {
            setRecentDmg(null);
        }, 1750)
    }

    const onAddPress = () => {
        addDmg();
        if (showRecentDmg) {
            doRecentDmg(() => setRecentDmg(recentDmg + 1))
        }
    }

    const onSubPress = () => {
        subtractDmg();
        if (showRecentDmg) {
            doRecentDmg(() => setRecentDmg(recentDmg - 1))
        }
    }

    const recentDmgPosition = isRotated ? (windowWidth / 14) : (windowHeight / 7)

    return (
        <View style={styles.dmgContainer}>
            {showRecentDmg && <View style={[styles.recentDmg, {top: recentDmgPosition}]}>
                <Text style={styles.recentDmgText}>{recentDmg}</Text>
            </View>}
            <TouchableOpacity style={[styles.mainDmgButton]}
                              onPress={onSubPress}>
                <Text style={[styles.mainDmgButtonText]}>-</Text>
            </TouchableOpacity>
            <View style={[styles.lifeBox]}>
                <Text style={[styles.lifeText]}>{hitPoints}</Text>
            </View>
            <TouchableOpacity style={[styles.mainDmgButton]}
                              onPress={onAddPress}>
                <Text style={[styles.mainDmgButtonText]}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    dmgContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    recentDmg: {
        position: 'absolute'
    },
    recentDmgText: {
        fontSize: 30
    },
    lifeBox: {
        position: 'absolute',
        zIndex: -1
    },
    mainDmgButton: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
    },
    lifeText: {
        fontSize: 70,
        fontWeight: 'bold'
    },
    mainDmgButtonText: {
        fontSize: 60,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
});
