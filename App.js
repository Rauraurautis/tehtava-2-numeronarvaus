import React, { useState, useMemo, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default function App() {
  const [randomNumber, setRandomNumber] = useState(() => { return Math.floor((Math.random() * 100) + 1) })
  const [number, setNumber] = useState(null)
  const [tries, setTries] = useState(0)
  const [text, setText] = useState("Guess a number between 1-100")

  const compareNumbers = () => {
    if (number < 1 || number > 100) {
      return Alert.alert("Enter a number between 1-100")
    }

    if (Number(number) === randomNumber) {
      Alert.alert(`You guessed the number in ${tries + 1} guess(es)!`)
      setNumber(null)
      setRandomNumber(() => { return Math.floor((Math.random() * 100) + 1) })
      setText("Guess a number between 1-100")
      setTries(0)
      return
    }
    setTries(tries + 1)
    number < randomNumber ? setText(`Your guess ${number} is too low`) : setText(`Your guess ${number} is too high`)
  }

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <TextInput style={styles.numberinput} keyboardType='numeric' onChangeText={text => {
        setNumber(text)
      }} value={number} />
      <View style={styles.button}>
        <Button onPress={compareNumbers} title="Make a guess" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberinput: {
    borderWidth: 2,
    width: 250
  },
  button: {
    marginTop: 10
  }
});
