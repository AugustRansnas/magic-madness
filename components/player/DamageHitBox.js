import {StyleSheet, TouchableHighlight, TouchableOpacity, View} from "react-native";
import ExoText from "../buildingblocks/ExoText";
import React, {useCallback, useEffect, useRef, useState} from "react";

export default function DamageHitBox({onPress, onLongPress, text}) {
    const [isPressed, setPressed] = useState(false);
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
        setPressed(false);
    };

    return (
        <TouchableHighlight
            underlayColor="transparent"
            onPress={() => {
                pressTimer.current = setTimeout(() => {
                    if (!longPressTriggered.current) {
                        onPress();
                    }
                }, 0);
            }}
            onLongPress={onLongPressAction}
            onPressOut={handlePressOut}
            onShowUnderlay={() => setPressed(true)}
            onHideUnderlay={() => setPressed(false)}
            style={[styles.dmgBtn]}>
            <>
                <ExoText style={[styles.mainDmgButtonText]}>{text}</ExoText>
                {isPressed && <View style={styles.overlay}/>}
            </>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    dmgBtn: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    dmgText: {
        fontSize: 60
    }
});