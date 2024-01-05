import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CarCharge = ({ route }) => {
  const { chargeStationId } = route.params;
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState(null);
  const [kwValue, setKwValue] = useState(0);
  const [totalKwValue, setTotalKwValue] = useState(0); 
  const [chargeStartInfo, setChargeStartInfo] = useState(false);

  useEffect(() => {
   
    const interval = setInterval(() => {
      sendStationInfoRequest();
    }, 5000);

    
    return () => clearInterval(interval);
  }, []);

  const sendStationInfoRequest = async () => {
    try {
      const chargeStation = {
        id: chargeStationId,
      };
      console.log("gonderilen id: "+chargeStationId);
      const response = await axios.post('http://45.141.151.31:5000/api/chargestation/poststationidmobil', chargeStation);

      if (response.data) {
       
        setKwValue(response.data.iac);
        console.log("anlik: "+response.data.iac);
        setTotalKwValue(response.data.tkw);
      }
    } catch (error) {
      console.log('Şarj istasyonu bilgisi alma hatası:', error);
    }
  };

  const handleExitStation = async () => {
    try {
     
      const chargeStationId = await AsyncStorage.getItem('chargeStationId');
      const userId = await AsyncStorage.getItem('userId');
  
      console.log("userId: " + userId);
      console.log("chargeStationId: " + chargeStationId);
  
      if (chargeStationId && userId) {
      
        const chargeStation = {
          id: chargeStationId,
          user: { id: userId },
        };
  
        console.log("userId: " + userId);
        console.log("chargeStationId: " + chargeStationId);
  
        if (totalKwValue > 0) {
          Alert.alert('İstasyondan Çıkılamadı', 'Şarjı durdurun ödemenizi tamamlayın.');
        } else {
          const response = await axios.post('http://45.141.151.31:5000/api/chargestation/poststationuserdisconnect', chargeStation);
  
          if (response.data === 1) {
            console.log('Şarj istasyonundan çıkıldı');
            await AsyncStorage.removeItem('chargeStationId');
  
         
            navigation.navigate('Map');
          } else {
            console.log('Şarj istasyonundan çıkma başarısız:', response.data);
            Alert.alert('Hata: ' + response.data);
          }
        }
      } else {
        console.log('ChargeStationId veya UserId eksik');
        Alert.alert('Hata: Şarj istasyonundan çıkarken bir sorun oluştu.');
      }
    } catch (error) {
      console.log('Şarj istasyonundan çıkma hatası:', error);
      Alert.alert('Hata: Şarj istasyonundan çıkarken bir sorun oluştu.');
    }
  };
  

  const handleStartCharging = async () => {
    try {
      const userIdString = await AsyncStorage.getItem('userId');
      if (userIdString !== null && userIdString !== undefined) {
        const userId = parseInt(userIdString);
      
      } else {
       
      }
      const userId = parseInt(userIdString);
      const stationInfo = {
        id: chargeStationId,
        user: { id: userId },
        chargeStartStopConfirm: 1,
      };

      console.log(chargeStationId);
      console.log(userId);
      console.log(stationInfo);
      const response = await axios.post('http://45.141.151.31:5000/api/chargestation/postchargestartstopconfirm', stationInfo);

      if (response.data === 1) {
        console.log('Şarj başlatıldı');
        await AsyncStorage.setItem('chargeStartInfo', 'true');
        Alert.alert('Başarılı', 'Şarj başlatıldı');

      
      } else {
        await AsyncStorage.setItem('chargeStationId');
        console.log('Şarj başlatma başarısız:', response.data);
        Alert.alert('Hata: ' + response.data);
      }
    } catch (error) {
      console.log('Şarj başlatma hatası:', error);
      Alert.alert('Hata: ' + error);
    }
  };

  const handleStopCharging = async () => {
    try {
      const userIdString = await AsyncStorage.getItem('userId');
      if (userIdString !== null && userIdString !== undefined) {
        const userId = parseInt(userIdString);
     
      } else {
        
      }
      const userId = parseInt(userIdString);
      const stationInfo = {
        id: chargeStationId,
        user: { id: userId },
        chargeStartStopConfirm: 2,
      };

      console.log(chargeStationId);
      console.log(userId);
      console.log(stationInfo);
      const response = await axios.post('http://45.141.151.31:5000/api/chargestation/postchargestartstopconfirm', stationInfo);

      if (response.data === 1) {
        console.log('Şarj durduruldu');
        Alert.alert('Başarılı', 'Şarj durduruldu');
        await AsyncStorage.removeItem('chargeStartInfo');
        setChargeStartInfo(false);


      
        navigation.navigate('Payment2', { chargeStationId: chargeStationId});

      } else {
        console.log('Şarj durdurma başarısız:', response.data);
        Alert.alert('Hata: ' + response.data);
      }
    } catch (error) {
      console.log('Şarj durdurma hatası:', error);
      Alert.alert('Hata: ' + error);
    }
  };

  const handlePayment = () => {
    navigation.navigate('Payment2', { kwValue: kwValue, chargeStationId: chargeStationId });
  };

  return (
    <View style={styles.container}>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <>
          <Text style={styles.text}>Istasyona başarıyla bağlandınız!</Text>
          {chargeStationId && (
            <View style={styles.chargeStationDetails}>
              <Text style={styles.label}>Istasyon ID: </Text>
              <Text style={styles.value}>{chargeStationId}</Text>
            </View>
          )}
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Anlık kw:</Text>
            <Text style={styles.value}>{kwValue} kw</Text>
            <Text style={styles.label}>Toplam kw:</Text>
            <Text style={styles.value}>{totalKwValue} kw</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Şarjı Başlat" onPress={handleStartCharging} />
            <Button title="Şarjı Durdur" onPress={handleStopCharging} />
          </View>

          {/* "Şarj İstasyonundan Çık" butonu */}
          <TouchableOpacity onPress={handleExitStation}>
            <Text style={styles.exitButton}>Şarj İstasyonundan Çık</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  chargeStationDetails: {
    marginVertical: 10,
  },
  infoContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  exitButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});

export default CarCharge;
