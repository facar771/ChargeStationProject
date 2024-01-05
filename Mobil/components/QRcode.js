import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QRCodeScannerScreen = () => {
  const [scannedData, setScannedData] = useState(null);
  const navigation = useNavigation();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [qrScanned, setQrScanned] = useState(false); 

  const getCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    return status === 'granted';
  };

  const handleBarcodeScanned = async ({ data }) => {
    if (!qrScanned) {
      setScannedData(data);
      setQrScanned(true);
  
      try {
        const userId = await AsyncStorage.getItem("userId");
        const requestData = {
          qrCode: data,
          userId: parseInt(userId),
        };
        const response = await axios.post('http://45.141.151.31:5000/api/chargestation/poststationinfo', requestData);
  
        if (response.data !== null && response.data !== undefined) {
          const chargeStationId = response.data;
          if (chargeStationId === 0) {
            console.log('Bu şarj istasyonunda başka bir kullanıcı mevcut.');
            Alert.alert('Uyarı', 'Bu şarj istasyonunda başka bir kullanıcı mevcut.');
            navigation.navigate('Map');
          } else {
            console.log('Sunucudan dönen veri:', chargeStationId);
            await AsyncStorage.setItem('chargeStationId', chargeStationId.toString());
            navigation.navigate('CarCharge', { chargeStationId });
          }
        } else {
          console.log('Sunucuyla ilgili bir hata oluştu:', response.status);
        }
      } catch (error) {
        console.log('Bir hata oluştu:', error);
      }
    }
  };
  

  useEffect(() => {
    const checkCameraPermission = async () => {
      const granted = await getCameraPermission();
      setHasCameraPermission(granted);
    };
  
    const checkUserConnectedStation = async () => {
      try {
          const userId = await AsyncStorage.getItem('userId');
          if (userId) {
              const userIdAsInt = parseInt(userId, 10); 
              console.log(userIdAsInt);
              const response = await axios.post('http://45.141.151.31:5000/api/chargestation/poststationuserconnectcheck', null, {
                  params: {
                      userId: userIdAsInt 
                  }
              });
              if (response.data) {
                  const chargeStationId = response.data;
                  console.log(response.data);
                  navigation.navigate('CarCharge', { chargeStationId });
              }
          }
      } catch (error) {
          console.log('Bir hata oluştu:', error);
      }
  };
    checkCameraPermission();
    checkUserConnectedStation();
  }, []);
  

  useEffect(() => {
    if (scannedData) {
      console.log('Scanned Data:', scannedData);
    }
  }, [scannedData, navigation]);

  useFocusEffect(() => {
    const requestCameraPermission = async () => {
      const granted = await getCameraPermission();
      if (!granted) {
        Alert.alert(
          'Kamera İzni',
          'Kamera erişimi için izin vermeniz gerekmektedir. Bu uygulama, QR kodlarını tarayabilmek için kamerayı kullanmaktadır.',
          [{ text: 'Tamam', onPress: () => navigation.goBack() }]
        );
      }
    };

    requestCameraPermission();
  });

  if (hasCameraPermission === null) {
    return <Text style={styles.cameraPermission}>Kamera İzni Gerekiyor</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner style={styles.camera} onBarCodeScanned={handleBarcodeScanned} />
      {scannedData && (
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>{scannedData}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  dataContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
  },
  dataText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cameraPermission: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default QRCodeScannerScreen;
