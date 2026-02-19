import React, {useState} from "react";
import {
    Modal,
    StyleSheet,
    Pressable,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native";
import * as core from "../../../store/core";
import {useStore} from "../../../store/store";
import ExoText from "../../buildingblocks/ExoText";
import CommanderDamage from "./CommanderDamage";

export default function PlayerModal({player, playerHeight, playerWidth}) {
    const [playerModalVisible, setPlayerModalVisible] = useState(false);
    const {windowWidth, windowHeight} = core.getWindow();
    const modalHeight = windowHeight * 0.70;
    const modalWidth = windowWidth * 0.85;

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={playerModalVisible}
                onRequestClose={() => setPlayerModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setPlayerModalVisible(false)}>
                    <View style={styles.centeredView}>
                        <TouchableWithoutFeedback onPress={() => {}}>
                            <View style={[styles.modalContainer, {
                                height: modalHeight,
                                width: modalWidth
                            }]}>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setPlayerModalVisible(false)}
                                >
                                    <ExoText style={styles.closeText}>✕</ExoText>
                                </TouchableOpacity>
                                <View style={styles.boardArea}>
                                    <CommanderDamage player={player}/>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <Pressable
                style={[styles.playerModalButton, {top: (playerHeight / 2) - 40}]}
                onPress={() => setPlayerModalVisible(true)}
            />
        </>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
    },
    modalContainer: {
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: "#1a1a1a",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    closeButton: {
        position: "absolute",
        top: 8,
        right: 8,
        zIndex: 10,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    closeText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    boardArea: {
        flex: 1,
        margin: 6,
        borderRadius: 10,
        overflow: "hidden",
    },
    playerModalButton: {
        position: "absolute",
        alignSelf: "center",
        borderRadius: 20,
        padding: 40,
        elevation: 2,
        backgroundColor: "rgba(255, 255, 255, 0)",
    },
});
