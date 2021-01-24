import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Button, View } from 'react-native';
import Game from './components/Game'






export default function App() {

  return (
    <SafeAreaView style = {styles.container}>

            <Game/>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
