import React, { useEffect, useState } from 'react';
import {
  Text, View, TextInput, Image, Button, StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import MainHeartIcon from '../images/main-heart.png';
import MariaLogoIcon from '../images/maria-logo.png';
import { useFirestoreContext } from '../context/firestore-context';

export const LoginScreen = ({ navigation }) => {
  const firestoreData = useFirestoreContext();
  const [status, setStatus] = useState(true);
  const [token, setToken] = useState('');
  const [partnerKey, setPartnerKey] = useState('');
  const [myKey, setMyKey] = useState('');
  function onSubmitToken() {
    let flag = false;
    setStatus('Подключение...');
    firestoreData.get()
      .then((res) => {
        res.forEach((doc) => {
          if (doc.id === token) {
            flag = true;
          }
        });
        if (flag) {
          navigation.navigate('Home', { collection: firestoreData.doc(token), myKey, partnerKey });
          setStatus('');
        } else {
          setStatus('Ошибка');
        }
      })
      .catch(() => {
        setStatus('Ошибка');
      });
  }
  return (
    <View style={styles.container}>
      <Image
        source={MariaLogoIcon}
        style={styles.imageText}
      />
      <Image
        source={MainHeartIcon}
        style={styles.imageLogo}
      />
      <Text style={styles.title}>Введите общий ключ:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setToken(text)}
        value={token}
      />
      <Text style={styles.title}>Введите ключ своей половинки:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPartnerKey(text)}
        value={partnerKey}
      />
      <Text style={styles.title}>Введите ваш ключ:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setMyKey(text)}
        value={myKey}
      />
      <Text style={styles.status}>
        {status}
      </Text>
      <Button
        color="#FF887C"
        title="Соединиться"
        onPress={onSubmitToken}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',

    backgroundColor: '#FFF',
  },
  imageLogo: {
    marginTop: 10,
    width: 240,
    height: 240,
  },
  imageText: {
    marginTop: 5,
    marginLeft: 200,
    width: 100,
    height: 50,
  },
  title: {
    marginTop: 15,
    color: '#FF887C',

    fontFamily: 'Roboto',
    fontSize: 21,
  },
  status: {
    marginTop: 5,
    marginBottom: 25,

    color: '#FF887C',
    fontFamily: 'Roboto',
    fontSize: 21,
  },
  input: {
    width: 300,
    height: 50,
    paddingLeft: 10,

    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderColor: '#FF887C',
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderRadius: 2,

    color: '#FF887C',
    fontFamily: 'Roboto',
    fontSize: 21,
  },
});
