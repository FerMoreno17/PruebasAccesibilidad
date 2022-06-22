/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import TTS, { Voice } from 'react-native-tts';

//NOTE: como actuamos en caso que el usuario tenga activada
//el asistente de voz nativo?
//se daria el caso que se reproduzca dos veces el sonido
//volviendose indescifrable

//chequear si voiceOver esta activado deshabilitar el de la app



const App = () => {
  const [size, setSize] = useState(18);
  const voicesName = ['Efraín', 'Clara', 'Marcos', 'Abril'];
  const [voicesAvailables, setVoicesAvailables] = useState<Voice[]>([]);
  const fuenteMaxima = 30;
  const fuenteMinima = 12;
  const ref = useRef();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    status: {
      margin: 30,
    },
    fabContainer: {
      position: 'absolute',
      top: 15,
      right: 15,
      flexDirection: 'row',
      alignItems: 'center',
      zIndex: 999,
    },
    fab: {
      backgroundColor: 'grey',
      width: 40,
      height: 40,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
    },
    button: {
      backgroundColor: '#2BAEB7',
      padding: 10,
      borderRadius: 10,
    },
    volumenContainer: {
      flexDirection: 'row',
      position: 'absolute',
      top: 15,
      left: 15,
    },
    volumen: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    titulo: {
      color: 'black',
      fontWeight:'bold',
      fontSize: size,
    },
    subtitulo: {
      color: 'black',
      fontStyle:'italic',
      fontSize: size - 2,
    },
    parrafo: {
      color: 'black',
      fontSize: size - 4,
    }
  });

  useEffect(() => {
    TTS.getInitStatus().then(() => {
      TTS.setDefaultLanguage('es-ES');
      TTS.setDefaultVoice('es-us-x-sfb#male_3-local');
    }, (err) => {
      if (err.code === 'no_engine') {
        //aca tendria que pedir al usuario que instale
        //el motor de texto a voz de su SO
        TTS.requestInstallEngine();
      }
    });

    if (voicesAvailables.length === 0) {
      getVoices();
    }
  }, []);

  function agrandarFuente() {
    if (size < fuenteMaxima) {
      setSize(size + 2);
    }
  }
  function achicaFuente() {
    if (size > fuenteMinima) {
      setSize(size - 2);
    }
  }

  function subirVolumen() { TTS.pause(); }
  function bajarVolumen() { TTS.resume(); }

  async function getVoices() {
    const voices = await TTS.voices();
    const array = voices
      .filter(v => !v.networkConnectionRequired && !v.notInstalled)
      .map(voice => {
        return voice;
      });
    console.log(JSON.stringify(array, null, 2));
    setVoicesAvailables(array);
  }

  function speech() {
    TTS.speak('Hola, ahora vas a poder dar la fe de vida estes donde estes');
  }

  function handleSelectedVoice(voice: string) {
    switch (voice) {
      case 'Efraín': TTS.setDefaultVoice('es-us-x-sfb#male_3-local');
        break;
      case 'Clara': TTS.setDefaultVoice('es-us-x-sfb#female_2-local');
        break;
      case 'Marcos': TTS.setDefaultVoice('es-es-x-ana#male_1-local');
        break;
      case 'Abril': TTS.setDefaultVoice('es-us-x-sfb#female_1-local');
        break;
      default: TTS.setDefaultVoice('es-es-x-ana#female_2-local');
        break;
    }
    speech();
  }


  return (
    <View style={[styles.container, { backgroundColor: 'white', flex: 1 }]}>
      <Pressable ref={ref.current} style={styles.status} onPress={speech}>
        <Text style={styles.titulo}>
          <Text>{'Hola, \n'}</Text>
          <Text>{'Ahora vas a poder \n dar'} </Text>
          <Text>fe de vida </Text>
          {' \n (supervivencia) \n estés donde estés.'}
        </Text>

        <Text style={styles.subtitulo}>Subtitulo ejemplo</Text>
        <Text style={styles.parrafo}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Text>

      </Pressable>

      <View style={styles.fabContainer}>
        <Pressable style={styles.fab} onPress={agrandarFuente}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>A</Text>
        </Pressable>
        <Pressable style={styles.fab} onPress={achicaFuente}>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>A</Text>
        </Pressable>
      </View>

      <View style={styles.volumenContainer}>
        <Pressable style={styles.fab} onPress={subirVolumen}>
          <Text style={styles.volumen}>||</Text>
        </Pressable>
        <Pressable style={styles.fab} onPress={bajarVolumen}>
          <Text style={styles.volumen}>{'>'}</Text>
        </Pressable>
      </View>

      {/* <ScrollView>
        <Text>
          {voicesAvailables && JSON.stringify(voicesAvailables, null, 2)}
        </Text>
      </ScrollView> */}

      <View>
        <Text style={styles.parrafo}>Cambiar voz de lectura</Text>
        {voicesAvailables &&
          <SelectDropdown
            dropdownIconPosition="right"
            defaultButtonText="Voces disponibles"
            data={voicesName}
            onSelect={(voice) => { handleSelectedVoice(voice); }}
            buttonTextAfterSelection={(selectedItem) => {
              return selectedItem;
            }}
            rowTextForSelection={(item) => {
              return item;
            }}
          />
        }
      </View>
    </View>
  );
};

export default App;
