import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, Linking, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReservationDetailsScreen = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const userIdString = await AsyncStorage.getItem('userId');
        const userId = parseInt(userIdString);
        const data = `userId=${userId}`; 
        console.log(data);
        const response = await axios.post('http://45.141.151.31:5000/api/reservation/listreservations', data , {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        setReservations(response.data);
        console.log("Sunucudan gelen cevap: " + response.data);
      } catch (error) {
        console.log('Hata:', error);
      }
    };

    fetchReservations();
  }, []);

  const handleDeleteReservation = async (reservationId) => {
    try {
        const response = await axios.delete('http://45.141.151.31:5000/api/reservation/reservationdelete', {
            params: {
                reservationId: reservationId,
            },
        });

        console.log('Silme işlemi başarılı:', response.data);
        
        const updatedReservations = reservations.filter(item => item.id !== reservationId);
        setReservations(updatedReservations);
    } catch (error) {
        console.log('Hata:', error);
    }
};

  const renderReservationItem = ({ item }) => (
    <View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Şarj İstasyonu ID:</Text>
        <Text style={styles.value}>{item.chargeStationId}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Tarih:</Text>
        <Text style={styles.value}>{item.reservation.split('T')[0]}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Saat:</Text>
        <Text style={styles.value}>{item.reservation.split('T')[1]}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDeleteReservation(item.id)}>
        <View style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Sil</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rezervasyon Detayları</Text>
      
      {reservations.length === 0 ? (
        <Text style={styles.errorMessage}>Rezervasyon bulunamadı.</Text>
      ) : (
        <FlatList
          data={reservations}
          renderItem={renderReservationItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    fontSize: 16,
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ReservationDetailsScreen;
