import React from 'react';
import {
  Text, View, Image, Button, StyleSheet,
} from 'react-native';

import MainHeartIcon from '../images/main-heart.png';

export const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Image
      source={MainHeartIcon}
      style={styles.image}
    />
    <Text style={styles.title}>
      Счётчик любви:
    </Text>
    <Text style={styles.counter}>
      50
    </Text>
    <View style={styles.buttons}>
      <Button
        color="#F55064"
        title="Я тебя люблю!"
      />
      <Button
        color="#F55064"
        title="Изменить ключ"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
    </View>

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
    marginTop: '25px',
    marginBottom: '10px',
    color: '#F55064',

    fontFamily: 'Roboto',
    fontSize: '21px',
  },
  counter: {
    color: '#F55064',

    fontFamily: 'Roboto',
    fontSize: '96px',

    marginBottom: '10px',
  },
  buttons: {
    flex: 1,
    justifyContent: 'space-evenly',
  }
});
