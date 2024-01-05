import React, { useState } from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const WebApi = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("WebApiSon");
  const markers = [];

  const submitName = () => {
    axios.post('http://45.141.151.31:5000/api/users/postName', { dataKey: name })
      .then(response => {
        console.log('İstek başarılı:', response.data);
      })
      .catch(error => {
        console.log('İstek hatası:', error);
      });
  };

  const getLocationAll = () => {
    axios.get('http://45.141.151.31:5000/api/chargestation/getstationall')
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


  return (
    <View style={styles.container}>
      <View style={styles.kenarliContainer}>
        <Text style={styles.buttonTextUst}>Hoşgeldin FERHAT</Text>
      </View>
      <Button title="İsmi Gönder" onPress={submitName} />
      <Button title="Konumları Getir" onPress={getLocationAll} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  kenarliContainer: {
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  buttonTextUst: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default WebApi;
