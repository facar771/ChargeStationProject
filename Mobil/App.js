import React, { useState, useEffect } from 'react';
import { StyleSheet, Button } from 'react-native';

import MapScreen from './components/Map';
import HomeScreen from './components/Home';
import Profile from './components/Profil';
import QRcode from './components/QRcode';
import Account from './components/MyAccount';
import Payment from './components/MyPayment';
import PaymentScreen from './components/MyPayment2';
import Reservation from './components/MyReservation';
import WebApi from './components/WebApi';
import MyReservations from './components/MyReservations'
import WarningScreen from './components/IP-5';
import UserLogin from './components/UserLogin';
import CarCharge from './components/CarCharge'
import ReservationDetailsScreen from './components/Payment'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 


const Stack = createStackNavigator();

export default function App() {
  
  const [name, setName] = useState("asdasd");  

  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName="AnaSayfa">

        <Stack.Screen name="Kullanıcı Girişi" component={UserLogin} /> 

        <Stack.Screen 
          name="Map" 
          component={MapScreen} 
          options={{ 
            title: 'Harita' ,
            headerShown: false,
            
            }} />

        

        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="Battery" component={Profile} options={{ title: 'Batarya' }} />

        <Stack.Screen name="QRcode" component={QRcode} options={{ title: 'qr kod' }} />

        <Stack.Screen name="Account" component={Account} options={{ title: 'hesabım' }} />

        <Stack.Screen name="Payment" component={Payment} options={{ title: 'ödeme' }} />

        <Stack.Screen name="Payment2" component={PaymentScreen} options={{ title: 'Ödeme Sayfası' }} />

        <Stack.Screen name="Reservation" component={Reservation} options={{ title: 'rezervasyon' }} />

        <Stack.Screen name="WebApi" component={WebApi} options={{ title: 'webİstek' }} />

        <Stack.Screen name="MyReservations" component={MyReservations} options={{ title: 'Oluşturulan Rezervasyon' }} />

        <Stack.Screen name="WarningScreen" component={WarningScreen} options={{ title: 'IP-5 uyarısı' }} />

        <Stack.Screen name="CarCharge" component={CarCharge} options={{ title: 'Arac Sarj' }} />

        <Stack.Screen name="ReservationDetailsScreen" component={ReservationDetailsScreen} options={{ title: 'Rezervasyon Bilgilerim' }} />

      </Stack.Navigator>
      
      
    </NavigationContainer>
  ); 
}

const styles = StyleSheet.create({
  
});
