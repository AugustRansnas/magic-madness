import React from 'react';
import AppLoading from 'expo-app-loading';
import {Exo_400Regular, useFonts} from '@expo-google-fonts/exo';
import {StatusBar} from 'expo-status-bar';
import {StateProvider} from './store/store';
import MainBoard from "./components/MainBoard";

export default function App() {
    let [fontsLoaded] = useFonts({
        Exo_400Regular
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    }
    return (
        <StateProvider>
            <MainBoard/>
            <StatusBar style="auto"/>
        </StateProvider>
    )
}

