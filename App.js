import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as firebase from 'firebase';

import { firebaseConfig } from './config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const userRef = db.collection('users').doc('token');

export default function App() {
  const [text, setText] = useState('');
  userRef.get()
    .then((res) => {
      console.log(res.data());
    });
  return (
    <View>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{ text }</Text>
    </View>
  );
}
