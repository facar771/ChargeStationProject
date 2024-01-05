import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReservationScreen = () => {
  const route = useRoute();
  const { stationId } = route.params;
  const { stationCoordinate } = route.params;
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [reservedHours, setReservedHours] = useState({});
  const [reservationHours, setReservationHours] = useState({});
  const [reservations, setReservations] = useState([]);

  const setHourAvailability = (date, hour, isAvailable) => {
    setReservedHours(prevState => ({
      ...prevState,
      [date]: {
        ...prevState[date],
        [hour]: {
          ...prevState[date][hour],
          isAvailable,
        },
      },
    }));
  };

  const handleReservation = async () => {
    if (!selectedDate || !selectedHour) {
      Alert.alert('Hata', 'Lütfen geçerli bir tarih ve saat seçin.');
      return;
    }
  
    try {
      const userIdString = await AsyncStorage.getItem('userId');
      const userId = parseInt(userIdString, 10);
      console.log("Seçilen saat: ", selectedDate, selectedHour);
      console.log("Seçilen şarj istasyonu ID:", stationId);
      console.log("Kişi ID si: ", userId);
  
      sendReservation(userId, stationId, selectedDate, selectedHour);
  
      navigation.navigate('MyReservations', {
        userId: userId,
        stationId: stationId,
        selectedDate: selectedDate,
        selectedHour: selectedHour,
        stationCoordinate,
      });
    } catch (error) {
      console.log('Hata:', error);
    }
  };
  

  const handleDayPress = (day) => {
    const [selectedDate, selectedHour] = day.dateString.split(' ');
    setSelectedDate(selectedDate);
    setSelectedHour('');
  
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split('T')[0];
  
    if (selectedDate === currentDateString) {
      const currentHour = currentDate.getHours();
      const reservationHours = { ...reservedHours[selectedDate] };
  
      if (reservationHours) {
        for (let i = 0; i <= currentHour; i++) {
          const hour = i < 10 ? `0${i}:00` : `${i}:00`;
          if (reservationHours[hour]) {
            setHourAvailability(selectedDate, hour, false);
          }
        }
      }
  
      setReservedHours((prevState) => ({
        ...prevState,
        [selectedDate]: reservationHours,
      }));
    } else {
      const selectedDateTime = new Date(`${selectedDate}T00:00:00`);
      const maxDateTime = new Date();
      maxDateTime.setDate(currentDate.getDate() + 10);
  
      if (selectedDateTime > maxDateTime) {
        Alert.alert('Uyarı', 'Sadece 10 gün içinde rezervasyon yapabilirsiniz!');
        setSelectedDate(''); 
      }
    }
  };
  
  

  const sendReservation = async (userId, stationId, selectedDate, selectedHour) => {
    try {
     
      const reservationData = {
        user: { id: userId },
        chargeStationId: stationId,
        reservation: `${selectedDate}T${selectedHour}:00`,
      };

      console.log(reservationData);
      const response = await axios.post('http://45.141.151.31:5000/api/reservation/postreservation', reservationData);

      console.log('Rezervasyon isteği başarıyla gönderildi:', response.data);
    } catch (error) {
      console.log('Rezervasyon isteği başarısız:', error);
    }
  };

  const fetchReservations = async () => {
    try {
      const data = { stationId: stationId };
      console.log(data);
      const response = await axios.post(
        'http://45.141.151.31:5000/api/reservation/liststationreservations',
        data,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      setReservations(response.data);
      console.log("Response from server: ", response.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(currentDate.getDate() + 10);

    const availableDates = [];
    const dateIterator = new Date(currentDate);

    while (dateIterator <= maxDate) {
      const dateString = dateIterator.toISOString().split('T')[0];
      const hours = Array.from({ length: 24 }, (_, i) => {
        const hour = i < 10 ? `0${i}:00` : `${i}:00`;
        const currentDateTime = new Date(`${dateString}T${hour}`);
        const nextHourDateTime = new Date(currentDateTime);
        nextHourDateTime.setHours(currentDateTime.getHours() + 1);
        const isAvailable = currentDate < currentDateTime || currentDate >= nextHourDateTime;
        return { hour, isAvailable };
      });

      setReservedHours(prevState => ({
        ...prevState,
        [dateString]: hours.reduce((acc, cur) => {
          acc[cur.hour] = cur;
          return acc;
        }, {}),
      }));

      availableDates.push(dateString);
      dateIterator.setDate(dateIterator.getDate() + 1);
    }

    const currentDateString = currentDate.toISOString().split('T')[0];
    const currentHour = currentDate.getHours();
    const currentDayReservations = reservedHours[currentDateString];

    if (currentDayReservations) {
      for (let i = 0; i <= currentHour; i++) {
        const hour = i < 10 ? `0${i}:00` : `${i}:00`;
        setHourAvailability(currentDateString, hour, false);
      }
    }
  }, []);

  useEffect(() => {
    fetchReservations();
  }, []);

  const minDate = new Date().toISOString().split('T')[0];

  const renderReservationHours = () => {
    const reservationHours = selectedDate ? Object.entries(reservedHours[selectedDate]) : [];
  
    if (reservationHours) {
      return (
        <ScrollView contentContainerStyle={styles.hoursContainer}>
          {reservationHours.map(([hour, { isAvailable }]) => {
            const reservationInfo = reservations.find(
              reservation =>
                reservation.reservation === `${selectedDate}T${hour}:00` &&
                reservation.chargeStationId === stationId
            );
            const isReserved = !!reservationInfo;
  
            return (
              <TouchableOpacity
                key={hour}
                style={[
                  styles.hourButton,
                  !isAvailable || isReserved ? styles.hourButtonDisabled : null, 
                  selectedHour === hour && styles.hourButtonSelected,
                  isHourBeforeCurrent(selectedDate, hour) && styles.hourButtonBeforeCurrent,
                  isReserved && { backgroundColor: 'red' },
                ]}
                onPress={() => handleHourSelect(hour)}
                disabled={!isAvailable || isReserved}
              >
                <Text style={[styles.hourText, !isAvailable || isReserved ? { color: 'white' } : null]}>
                  {hour}
                </Text>
              </TouchableOpacity>
            );
          })}
          {selectedDate && (
            <TouchableOpacity
              style={styles.reserveButton}
              onPress={() => handleReservation()}
              disabled={!selectedHour}
            >
              <Text style={styles.reserveButtonText}>Rezervasyon Yap</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      );
    }
  
    return null;
  };
  
  
  const isHourBeforeCurrent = (date, hour) => {
    const currentDate = new Date();
    const selectedDateTime = new Date(`${date}T${hour}`);
    return selectedDateTime < currentDate;
  };

  const handleHourSelect = (hour) => {
    setSelectedHour(hour);
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          minDate={minDate}
          onDayPress={handleDayPress}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: 'green' },
          }}
        />
      </View>
      <View style={styles.reservationContainer}>
        {selectedDate && (
          <>
            <View style={styles.hoursContainer}>
              {renderReservationHours()}
            </View>
          </>
        )}
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
  calendarContainer: {
    flex: 1,
    alignSelf: 'stretch',
    marginHorizontal: 0,
  },
  reservationContainer: {
    alignItems: 'center',
  },
  reservationInfo: {
    marginBottom: 10,
    alignItems: 'center',
  },
  reservationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 0,
    alignSelf: 'center',
  },
  reservationValue: {
    fontSize: 16,
  },
  hoursContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 5,
  },
  hourButton: {
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  hourButtonBeforeCurrent: {
    backgroundColor: 'lightgray', // Günün bugünden önceki saatleri için arka plan rengi
  },
  hourButtonSelected: {
    backgroundColor: 'lightblue',
  },
  hourButtonDisabled: {
    backgroundColor: 'gray',
  },
  hourButtonBeforeCurrent: {
    backgroundColor: '#AAAAAA', // Günün bugünden önceki saatleri için arka plan rengi
  },
  hourText: {
    color: 'black',
  },
  reserveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  reserveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReservationScreen;
