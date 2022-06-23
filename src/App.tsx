/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import TTS, { Voice } from 'react-native-tts';
import { TextToRead } from './diccionarioTextos/textToRead';
import { defaultTheme } from './styles/default.theme';

//NOTE: como actuamos en caso que el usuario tenga activada
//el asistente de voz nativo?
//se daria el caso que se reproduzca dos veces el sonido
//volviendose indescifrable

//chequear si voiceOver esta activado deshabilitar el de la app

const App = () => {
  const theme = defaultTheme();
  const [size, setSize] = useState(18);
  const [pause, setPause] = useState(0);
  const voicesName = ['Efraín', 'Clara', 'Marcos', 'Abril'];
  const [voicesAvailables, setVoicesAvailables] = useState<Voice[]>([]);
  const fuenteMaxima = 30;
  const fuenteMinima = 12;
  const textPositionRef = useRef(0);

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
      justifyContent: 'center',
      zIndex: 999,
    },
    fab: {
      backgroundColor: '#229CA5',
      width: 40,
      height: 40,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
    },
    fabMay: {
      fontSize: 26,
      fontWeight: 'bold',
      color: 'white',
    },
    fabMin: {
      fontSize: 22,
      fontWeight: 'bold',
      color: 'white',
    },
    button: {
      backgroundColor: '#2BAEB7',
      padding: 10,
      borderRadius: 10,
    },
    audioContainer: {
      flexDirection: 'row',
      position: 'absolute',
      top: 15,
      left: 15,
    },
    stopIcon: {
      fontSize: 22,
      fontWeight: 'bold',
      color: 'white',
    },
    titulo: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: size,
    },
    subtitulo: {
      color: 'black',
      fontStyle: 'italic',
      fontSize: size - 8,
    },
    parrafo: {
      color: 'black',
      fontSize: size - 12,
    },
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

  useEffect(() => {
    TTS.addEventListener('tts-progress', progress => {
      textPositionRef.current = progress.end;
    });

    return () => TTS.removeEventListener('tts-progress', () => console.log('remove'));
  }, []);


  async function getVoices() {
    const voices = await TTS.voices();
    const array = voices
      .filter(v => !v.networkConnectionRequired && !v.notInstalled)
      .map(voice => {
        return voice;
      });
    setVoicesAvailables(array);
  }


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

  function speech() {
    TTS.speak(TextToRead.ON_BOARDING_ONE);
  }

  function stop() {
    TTS.stop(); setPause(textPositionRef.current);
  }

  function resume() {
    const temp_text = TextToRead.ON_BOARDING_ONE.slice(pause);
    TTS.speak(temp_text);
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
      <Pressable style={styles.status} onPress={speech}>
        <Text style={theme.primaryText}>
          <Text>{'Hola, \n'}</Text>
          <Text>{'Ahora vas a poder \n dar'} </Text>
          <Text>fe de vida </Text>
          {' \n (supervivencia) \n estés donde estés.'}
        </Text>
        <Text style={theme.secondaryText}>
          {TextToRead.SUBTITLE}
        </Text>
        <Text style={theme.paragraph}>
          {TextToRead.PARAGRAPH}
        </Text>
      </Pressable>

      <View style={styles.fabContainer}>
        <Pressable style={styles.fab} onPress={agrandarFuente}>
          <Text style={styles.fabMay}>A</Text>
        </Pressable>
        <Pressable style={styles.fab} onPress={achicaFuente}>
          <Text style={styles.fabMin}>A</Text>
        </Pressable>
      </View>

      <View style={styles.audioContainer}>
        <Pressable style={styles.fab} onPress={stop}>
          <Text style={styles.stopIcon}>||</Text>
        </Pressable>
        <Pressable style={styles.fab} onPress={resume}>
          <Text style={styles.stopIcon}>{'>'}</Text>
        </Pressable>
      </View>

      <View>
        <Text style={theme.label}>Cambiar voz de lectura</Text>
        {voicesAvailables &&
          <SelectDropdown
            buttonStyle={{ backgroundColor: '#2BAEB7' }}
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
