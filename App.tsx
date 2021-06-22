import React from 'react';
import { StatusBar } from 'react-native';
import { useFonts } from 'expo-font'; //Carrega fontes no dispositivo do usuario
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Rajdhani_700Bold, Rajdhani_500Medium } from '@expo-google-fonts/rajdhani';
import AppLoading from 'expo-app-loading';

import { Routes } from './src/routes';
import { Background } from './src/components/Background';

export default function App(){
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading/> //Segura a tela de Splash enquanto as fontes não carregaram
  }

  return( 
    <Background>
      <StatusBar //Status bar no App.tsx por conta de ser utilizado no app inteiro mesmo para as fontes
        barStyle = 'light-content'
        backgroundColor = 'transparent'
        translucent
      />
      <Routes />
    </Background>
  );
}