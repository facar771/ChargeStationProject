import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const MyAccountScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [user, setUser] = useState({
    name: '',
    lastname: '',
    email: '',
    phonenumber: '',
    billType: '',
    userName: '',
    password: '',
  });

  const handleSave = () => {
    const userInfo = {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      phonenumber: user.phonenumber,
      billType: selectedOption,
    };
    console.log('Kullanıcı adı kaydedildi:', userInfo);

    axios
      .post('http://45.141.151.31:5000/api/users/postUser', userInfo)
      .then(response => {
        console.log('İstek başarılı:', response.data);
      })
      .catch(error => {
        console.log('İstek hatası:', error);
      });
  };

  const handleValidation = () => {
    const userInfo1 = {
      userName: user.userName,
      password: user.password,
    };
    console.log('Kullanıcı Bilgileri Tarandı:', userInfo1);

    axios
      .post('http://45.141.151.31:5000/api/users/postUserValidation', userInfo1)
      .then(response => {
        console.log('İstek başarılı:', response.data);
      })
      .catch(error => {
        console.log('İstek hatası:', error);
      });
  };

  const handleValidation2 = () => {
    axios
      .get('http://45.141.151.31:5000/api/chargestation/getstationall')
      .then(response => {
        const data = response.data;
        const id = data.map(item => item.id);
        const locations = data.map(item => item.location);
        navigation.navigate('Map', { locations: locations, id: id });
        console.log('İstek başarılı:', locations);
      })
      .catch(error => {
        console.log('İstek hatası:', error);
      });
  };

  const handleOption1 = () => {
    setSelectedOption('Option 1');
    setUser(prevUser => ({ ...prevUser, billType: 'Option 1' }));
    console.log('Option 1 seçildi');
  };

  const handleOption2 = () => {
    setSelectedOption('Option 2');
    setUser(prevUser => ({ ...prevUser, billType: 'Option 2' }));
    console.log('Option 2 seçildi');
  };

  const handleShowModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.line} />
        <Text style={styles.headerText}>Fatura Bilgilerim</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ad</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setUser(prevUser => ({ ...prevUser, name: text }))}
          value={user.name}
        />

        <Text style={styles.label}>Soyad</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setUser(prevUser => ({ ...prevUser, lastname: text }))}
          value={user.lastname}
        />

        <Text style={styles.label}>Kullanıcı Adı</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setUser(prevUser => ({ ...prevUser, userName: text }))}
          value={user.userName}
        />

        <Text style={styles.label}>Şifre</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setUser(prevUser => ({ ...prevUser, password: text }))}
          value={user.password}
        />
      </View>

      <View style={styles.headerContainer2}>
        <View style={styles.line} />
        <Text style={styles.headerText}>Fatura Tipi</Text>
      </View>

      <View style={styles.buttonContainer2}>
        <TouchableOpacity
          style={[styles.button, selectedOption === 'Option 1' ? styles.selectedButton : null]}
          onPress={handleOption1}
        >
          <Text
            style={[
              styles.buttonText,
              selectedOption === 'Option 1' ? styles.selectedButtonText : null,
            ]}
          >
            Bireysel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedOption === 'Option 2' ? styles.selectedButton : null]}
          onPress={handleOption2}
        >
          <Text
            style={[
              styles.buttonText,
              selectedOption === 'Option 2' ? styles.selectedButtonText : null,
            ]}
          >
            Kurumsal
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleShowModal}>
        <Text style={styles.saveButtonText}>Kaydet</Text>
      </TouchableOpacity>

      <Modal animationType="fade" transparent visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Kişi giriş bilgileri değiştirilememekte olup yeni kayıt admin dışında yapılamamaktadır...</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
              <Text style={styles.modalButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  saveButton: {
    backgroundColor: 'blue',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 80,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
  modalButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MyAccountScreen;
