import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserLoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(true); 
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  const navigation = useNavigation();

  const handleValidation = async () => {
    const userInfo1 = {
      userName: username,
      password: password,
    };
    console.log('Kullanıcı Bilgileri Tarandı:', userInfo1);
  
    setModalVisible(true); 

    if (token && !token) {
      try {
        const response = await axios.post('http://45.141.151.31:5000/api/tokens/validateToken', { token });
        console.log('Token doğrulandı:', response.data);
        if (response.data === 0) {
          console.log("Tekrar Giriş Yapmalısınız.");
          AsyncStorage.removeItem('token');
          setIsLoggingIn(false); 
        } else if (response.data > 0) {
          console.log("Giriş Yapılabildi");
          navigation.navigate('Map');
        }
      } catch (error) {
        console.log('Token doğrulanamadı:', error);
        setIsLoggingIn(false); 
      } finally {
        setModalVisible(false);
      }
    } else {
      try {
        const response = await axios.post('http://45.141.151.31:5000/api/tokens/postUserValidation', userInfo1);
        console.log('İstek başarılı:', response.data);

        const responseServer = response.data;
        if (responseServer === 'Bilgiler yanlis') {
          setModalMessage('Bilgiler yanlış');
          setTimeout(() => {
            setModalVisible(false); 
          }, 1500);
        } else {
          await AsyncStorage.setItem('userId', responseServer.toString());
          setTimeout(() => {
            setModalVisible(false);
            navigation.navigate('Map');
          }, 200);
        }
      } catch (error) {
        console.log('İstek hatası:', error);
        setIsLoggingIn(false);
      }
    }
  };

  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        setModalVisible(false);
      }, 1500);
    }
  }, [modalVisible]);

  useEffect(() => {
    const getTokenFromAsyncStorage = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setToken(token);
          console.log('Token alındı:', token);
          setIsLoggingIn(true); 
          
        } else {
          setIsLoggingIn(false); 
        }
      } catch (error) {
        console.log('Token alınamadı:', error);
        setIsLoggingIn(false); 
      }
    };

    getTokenFromAsyncStorage();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Kullanıcı Adı:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Kullanıcı adınızı girin"
      />

      <Text style={styles.label}>Şifre:</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputWithIcon}
          value={password}
          onChangeText={setPassword}
          placeholder="Şifrenizi girin"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity style={styles.showPasswordButton} onPress={() => setShowPassword(!showPassword)}>
          <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleValidation}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>

      <Modal animationType="fade" transparent visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
          </View>
        </View>
      </Modal>

      {isLoggingIn && <Text style={styles.loadingText}>Giriş yapılıyor...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWithIcon: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 40,
  },
  showPasswordButton: {
    position: 'absolute',
    right: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default UserLoginScreen;
