import React, {useCallback, useEffect, useRef, useState} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import * as core from "../../store/core";
import ExoText from "../buildingblocks/ExoText";
import * as Haptics from 'expo-haptics';


function DamageHitBox({onPress, onLongPress, text}) {
    const onLongPressTimer = useRef(null);
    const pressTimer = useRef(null);
    const longPressTriggered = useRef(false);
    const latestOnLongPress = useRef(onLongPress);

    useEffect(() => {
        latestOnLongPress.current = onLongPress;
    }, [onLongPress]);


    const onLongPressAction = useCallback(() => {
        latestOnLongPress.current();
        onLongPressTimer.current = setInterval(() => {
            latestOnLongPress.current();
        }, 500);
    }, [onLongPress]);

    const handlePressOut = () => {
        clearTimeout(pressTimer.current);
        clearInterval(onLongPressTimer.current);
        longPressTriggered.current = false;
    };

    return (
        <TouchableOpacity
            onPress={() => {
                pressTimer.current = setTimeout(() => {
                    if (!longPressTriggered.current) {
                        onPress();
                    }
                }, 0);
            }}
            onLongPress={onLongPressAction}
            onPressOut={handlePressOut}
            style={[styles.mainDmgOpacity]}>
            <ExoText style={[styles.mainDmgButtonText]}>{text}</ExoText>
        </TouchableOpacity>
    );
}

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
        };
    }, []);

    useEffect(() => {
        Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }, [recentDmg])

    function doRecentDmg(fn) {
        clearTimeout(timer.current);
        fn();

        timer.current = setTimeout(function () {
            if (mounted.current) {
                setRecentDmg(null);
            }
        }, 1750);
    }

    const onAddPress = (dmgValue) => {
        addDmg(dmgValue);
        if (showRecentDmg) {
            doRecentDmg(() => setRecentDmg((prevDmg) => prevDmg + dmgValue));
        }
    };

    const onSubPress = (dmgValue) => {
        subtractDmg(dmgValue);
        if (showRecentDmg) {
            doRecentDmg(() => setRecentDmg((prevDmg) => prevDmg - dmgValue));
        }
    };

    const recentDmgPosition = isRotated ? (windowWidth / 14) : (windowHeight / 7);


    return (
        <View style={styles.dmgContainer}>
            {showRecentDmg && <View style={[styles.recentDmg, {top: recentDmgPosition}]}>
                <ExoText style={[styles.recentDmgText]}>{recentDmg}</ExoText>
            </View>}
            <DamageHitBox style={[styles.mainDmgOpacity]} onPress={() => onSubPress(1)}
                          onLongPress={() => onSubPress(10)} text="-"/>
            <View style={[styles.lifeBox]}>
                <ExoText style={[styles.lifeText]}>{hitPoints}</ExoText>
            </View>
            <DamageHitBox onPress={() => onAddPress(1)} onLongPress={() => onAddPress(10)} text="+"/>
        </View>
    );
}

const styles = StyleSheet.create({
    dmgContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid black",
    },
    recentDmg: {
        position: "absolute"
    },
    recentDmgText: {
        fontSize: 30
    },
    lifeBox: {
        position: "absolute",
        zIndex: -1
    },
    mainDmgOpacity: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    lifeText: {
        fontSize: 60,
    },
    mainDmgButtonText: {
        fontSize: 60
    }
});
