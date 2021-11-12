import React from 'react';
import AppLoading from 'expo-app-loading';
import {Exo_400Regular, useFonts} from '@expo-google-fonts/exo';
import {StatusBar} from 'expo-status-bar';
import {StateProvider} from './store/store';
import MainBoard from "./components/MainBoard";
import BackgroundShader from "./components/shaders/BackgroundShader";

export default function App() {
    let [fontsLoaded] = useFonts({
        Exo_400Regular
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    }
    return (
        <StateProvider>
            <BackgroundShader/>
            <MainBoard/>
            <StatusBar style="auto"/>
        </StateProvider>
    )
}

