import React from 'react';
import {
  Text, View, TextInput, Image, Button, StyleSheet,
} from 'react-native';

import MainHeartIcon from '../images/main-heart.png';

export const LoginScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Image
      style={styles.image}
      source={MainHeartIcon}
    />
    <Text style={styles.title}>
      Введите ключ своей половинки:
    </Text>
    <TextInput style={styles.input} />
    <Button
      color="#F55064"
      title="Соединиться"
      onPress={() => {
        navigation.navigate('Home');
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',

    backgroundColor: '#FEFEFE',
  },
  image: {
    marginTop: '50px',
    width: 240,
    height: 240,
  },
  title: {
    marginTop: '50px',
    color: '#F55064',

    fontFamily: 'Roboto',
    fontSize: '21px',
  },
  input: {
    width: '300px',
    height: '50px',
    paddingLeft: '10px',

    marginTop: '10px',
    marginBottom: '25px',
    paddingTop: '20px',
    paddingBottom: '20px',
    borderColor: '#F55064',
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderRadius: 2,

    color: '#F55064',
    fontFamily: 'Roboto',
    fontSize: '21px',
  },
});
