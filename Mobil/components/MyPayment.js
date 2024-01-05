import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyPaymentScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleSave = () => {
    console.log('Kullanıcı adı kaydedildi:', username);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.line} />
        <Text style={styles.headerText}>Kart Bilgilerim</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Kart Numarası</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setUsername(text)}
          value={username}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    top: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  headerContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    top: 60,
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    top: -3,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  line: {
    height: 1,
    marginVertical: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    width: '90%',
    alignItems: 'center',
    left: 20,
  },
  inputContainer: {
    top: 30,
  },
  label: {
    left: 30,
    fontSize: 16,
    marginBottom: 5,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    top: 50,
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  selectedButton: {
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedButtonText: {
    color: 'white',
  },
});

export default MyPaymentScreen;
