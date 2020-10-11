import React, { useState, useEffect } from 'react';
import {
  Text, View, Image, Button, StyleSheet,
} from 'react-native';

import MainHeartIcon from '../images/main-heart.png';
import MariaLogoIcon from '../images/maria-logo.png';

export const HomeScreen = ({ navigation, route: { params: { collection } } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    collection.get()
      .then((res) => {
        setIsLoading(false);
        setCount(res.data().lovesCount);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
    collection.onSnapshot((doc) => {
      setCount(doc.data().lovesCount);
    });
  }, []);
  function onAdd() {
    collection.update({ lovesCount: count + 1 });
  }
  if (isLoading) {
    return (
      <View style={styles.statusContainer}>
        <h1 style={{ color: '#FF887C' }}>Загрузка...</h1>
      </View>
    );
  }
  if (isError) {
    return (
      <View style={styles.statusContainer}>
        <h1 style={{ color: '#FF887C' }}>Ошибка!</h1>
      </View>
    );
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
      <Text style={styles.title}>
        Счётчик любви:
      </Text>
      <Text style={styles.counter}>
        {
          count
        }
      </Text>
      <View style={styles.buttons}>
        <Button
          color="#FF887C"
          title="Я тебя люблю!"
          onPress={onAdd}
        />
        <Button
          color="#FF887C"
          title="Изменить ключ"
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
      </View>

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
  statusContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 300,

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
    marginTop: 25,
    marginBottom: 10,
    color: '#FF887C',

    fontFamily: 'Roboto',
    fontSize: 21,
  },
  counter: {
    color: '#FF887C',

    fontFamily: 'Roboto',
    fontSize: 96,

    marginBottom: 10,
  },
  buttons: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
});
