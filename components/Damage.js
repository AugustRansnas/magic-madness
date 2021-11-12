import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as core from "../store/core";
import ExoText from "./buildingblocks/ExoText";

export default function Damage({
                                   isRotated,
                                   addDmg,
                                   subtractDmg,
                                   showRecentDmg,
                                   hitPoints
                               }) {
    const {windowWidth, windowHeight} = core.getWindow();
    const [recentDmg, setRecentDmg] = useState(null);

    const mounted = useRef(false);
    const timer = useRef(null);

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        }
    }, [])

    function doRecentDmg(fn) {
        clearTimeout(timer.current);
        fn()

        timer.current = setTimeout(function () {
            if (mounted.current) {
                setRecentDmg(null);
            }
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
                <ExoText style={styles.recentDmgText}>{recentDmg}</ExoText>
            </View>}
            <TouchableOpacity style={[styles.mainDmgButton]}
                              onPress={onSubPress}>
                <ExoText style={[styles.mainDmgButtonText]}>-</ExoText>
            </TouchableOpacity>
            <View style={[styles.lifeBox]}>
                <ExoText style={[styles.lifeText]}>{hitPoints}</ExoText>
            </View>
            <TouchableOpacity style={[styles.mainDmgButton]}
                              onPress={onAddPress}>
                <ExoText style={[styles.mainDmgButtonText]}>+</ExoText>
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
    },
    mainDmgButtonText: {
        fontSize: 60,
        alignSelf: 'center'
    }
});
