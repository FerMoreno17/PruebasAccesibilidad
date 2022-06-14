/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TTS from 'react-native-tts';


const App = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    status: {
      margin: 30,
    },
  });

  function speech(text: string) {
    TTS.speak(text);
  }


  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={styles.container}>
        <Pressable style={styles.status} onPress={() => speech('Hola, ahora vas a poder dar la fede vida estes donde estes')}>
          <Text style={{ color: 'black' }}>
            <Text>{"Hola, \n"}</Text>
            <Text>{"Ahora vas a poder \n dar"} </Text>
            <Text>fe de vida </Text>
            {" \n (supervivencia) \n estés donde estés."}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default App;
