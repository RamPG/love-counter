import React, { useState, useEffect } from 'react';
import {
  Text, View, Image, Button, StyleSheet,
} from 'react-native';

import MainHeartIcon from '../images/main-heart.png';
import MariaLogoIcon from '../images/maria-logo.png';
import {
  getHours,
  getHoursFormat, getMinutes, getMinutesFormat, getNameDay, getWeekDay,
} from '../utils/TimeLibrary';

export const HomeScreen = ({ navigation, route: { params: { collection, myKey, partnerKey } } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  useEffect(() => {
    let mounted = true;
    collection.get()
      .then((doc) => {
        if (mounted) {
          setInfo({
            allLoveCounter: doc.data().allLoveCounter,
            loveRecord: doc.data().loveRecord,
            myData: {
              loveCounter: doc.data()[myKey].loveCounter,
              loveTime: new Date(doc.data()[myKey].loveTime),
            },
            partnerData: {
              loveCounter: doc.data()[partnerKey].loveCounter,
              loveTime: new Date(doc.data()[partnerKey].loveTime),
            },
          });
          setIsLoading(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
    collection.onSnapshot((doc) => {
      setInfo({
        allLoveCounter: doc.data().allLoveCounter,
        loveRecord: doc.data().loveRecord,
        myData: {
          loveCounter: doc.data()[myKey].loveCounter,
          loveTime: new Date(doc.data()[myKey].loveTime),
        },
        partnerData: {
          loveCounter: doc.data()[partnerKey].loveCounter,
          loveTime: new Date(doc.data()[partnerKey].loveTime),
        },
      });
    });
    return function cleanup() {
      mounted = false;
    };
  }, []);
  function onAdd() {
    collection.update({
      allLoveCounter: info.allLoveCounter + 1,
      [myKey]: {
        loveCounter: info.myData.loveCounter + 1,
        loveTime: new Date().getTime(),
      },
    });
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
  console.log(getHoursFormat(getHours(info.partnerData.loveTime)));
  console.log(getMinutesFormat(getMinutes(info.partnerData.loveTime)));
  console.log(getNameDay(getWeekDay(info.partnerData.loveTime)));
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
        Счётчик общей любви:
      </Text>
      <Text style={styles.counter}>
        {
          info.allLoveCounter
        }
      </Text>
      <Text style={styles.title}>
        Счётчик любви партнера:
      </Text>
      <Text style={styles.counter}>
        {
          info.partnerData.loveCounter
        }
      </Text>
      <Text style={styles.title}>
        Время последней любви партнера:
      </Text>
      <Text style={styles.counter}>
        {
          `${getHoursFormat(getHours(info.partnerData.loveTime))} ${getMinutesFormat(getMinutes(info.partnerData.loveTime))} ${getNameDay(getWeekDay(info.partnerData.loveTime))}`
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
    fontSize: 21,

    marginBottom: 10,
  },
  buttons: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
});
