import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';

export default function App() {
    const [numberOfPlayersModalVisible, setNumberOfPlayersModalVisible] = useState(false);
    const [numberOfPlayers, setNumberOfPlayers] = useState(2);

    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={numberOfPlayersModalVisible}
                onRequestClose={() => {
                    setNumberOfPlayersModalVisible(!numberOfPlayersModalVisible);
                }}
                supportedOrientations={['portrait', 'landscape']}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Select number players.</Text>
                        {[1, 2, 3, 4].map((selectableNumber) => (
                            <Pressable
                                key={selectableNumber}
                                style={[styles.button, styles.selectableNumberOfPlayers]}
                                onPress={() => {
                                    setNumberOfPlayersModalVisible(!numberOfPlayersModalVisible);
                                    setNumberOfPlayers(selectableNumber);
                                }}
                            >
                                <Text style={styles.textStyle}>{selectableNumber}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </Modal>
            <Text>mtg-madness</Text>
            <Text>{numberOfPlayers}</Text>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setNumberOfPlayersModalVisible(true)}
            >
                <Text style={styles.textStyle}>Game menu</Text>
            </Pressable>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#00b8ae",
    },
    selectableNumberOfPlayers: {
        backgroundColor: "#00b8ae",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
