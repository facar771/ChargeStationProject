import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, Linking } from 'react-native';
import axios from 'axios';

const ReservationDetailsScreen = ({ route }) => {
  const [reservations, setReservations] = useState([]);

  const reservationData = {
    chargeStationId: 2,
    reservation: '2023-07-29 10:00',
  };

  const handleGoogleMapsRedirect = (stationCoordinate) => {
    
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rezervasyon Detayları</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Şarj İstasyonu ID:</Text>
        <Text style={styles.value}>{reservationData.chargeStationId}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Tarih:</Text>
        <Text style={styles.value}>{reservationData.reservation}</Text>
      </View>
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
  buttonContainer2: {
    marginVertical: 20,
  },
  reservationsContainer: {
    marginTop: 20,
  },
  reservationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reservation: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  reservationText: {
    fontSize: 16,
  },
  errorMessage: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReservationDetailsScreen;