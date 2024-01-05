import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import axios from 'axios'; // Import axios library
import { useNavigation } from '@react-navigation/native';

const PaymentScreen = ({ route }) => {
  const { chargeStationId } = route.params;
  const navigation = useNavigation();
  const [unitPrice, setUnitPrice] = useState(0); 
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [kwValue, setKwValue] = useState(0); 
  const [chargingPermissionFetched, setChargingPermissionFetched] = useState(false); 

 
  const calculateTotalAmount = () => {
    const kwValueFloat = parseFloat(kwValue);
    const unitPriceFloat = parseFloat(unitPrice);
    if (isNaN(kwValueFloat) || isNaN(unitPriceFloat)) {
      return 0;
    }
    return (kwValueFloat * unitPriceFloat).toFixed(2);
  };

  useEffect(() => {
   
    const fetchUnitPrice = async () => {
      try {
        const response = await axios.post(
          'http://45.141.151.31:5000/api/chargestation/postprice',
          `stationId=${chargeStationId}`, 
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
        setUnitPrice(response.data); 
      } catch (error) {
        console.log('Unit price could not be fetched:', error);
      }
    };

    const fetchChargingPermission = async () => {
      try {
        let response;
        do {
          const chargeStation = {
            id: chargeStationId,
          };

          console.log("Gönderilen ID: " + chargeStationId);

          try {
            response = await axios.post(
              'http://45.141.151.31:5000/api/chargestation/postchargepermission',
              chargeStation
            );
            console.log("dönen veri: " + response.data);
            if (response.data !== 2) {
              await new Promise((resolve) => setTimeout(resolve, 500));
            }
          } catch (error) {
            console.log('Hata oluştu:', error);
          }

        } while (response.data !== 2);

        const chargeStation = {
          id: chargeStationId,
        };

        console.log("Gönderilen ID: " + chargeStationId);

        try {
          const response = await axios.post(
            'http://45.141.151.31:5000/api/chargestation/poststationidmobil',
            chargeStation
          );

          if (response.data && response.data.tkw) {
            const tkwValue = response.data.tkw;
            setKwValue(tkwValue);
          } else {
            console.log("Geçerli bir tkw değeri alınamadı.");
          }
          setChargingPermissionFetched(true);
        } catch (error) {
          console.log('Hata oluştu:', error);
        }

      } catch (error) {
        console.log('Charging permission could not be fetched:', error);
      }
    };

    fetchUnitPrice();
    fetchChargingPermission(); 
  }, [chargeStationId]);

  const handlePayment = async () => {
    if (!chargingPermissionFetched) {
      Alert.alert('Hata', 'Lütfen şarj izni bekleyin.');
      return;
    }
  
    if (!cardNumber || !expirationDate || !cvv) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }
  
    const totalAmount = calculateTotalAmount();
  
    try {
      const chargeStation = {
        id: chargeStationId
      };

      console.log("id si: "+chargeStationId);
  
      const response = await axios.post('http://45.141.151.31:5000/api/chargestation/postchargepay', chargeStation);
  
      if (response.data === 1) {
        console.log('Ödeme alındı');
        Alert.alert('Başarılı', `Ödemeniz alındı. Ödenen tutar: ${totalAmount} TL`, [{ text: 'Tamam' }]);
  
        setTimeout(() => {
          navigation.navigate('Map');
        }, 2000);
      } else {
        console.log('Ödeme Başarısız:', response.data);
        Alert.alert('Hata: ' + response.data);
      }
    } catch (error) {
      console.log('Ödeme işlemi hatası:', error);
      Alert.alert('Hata: Ödeme işlemi sırasında bir sorun oluştu.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ödeme Sayfası</Text>

      {/* KW Girişi */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>KW:</Text>
        <Text style={styles.value}>{kwValue}</Text>
      </View>

      {/* Birim Fiyat Girişi */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Birim Fiyat:</Text>
        <Text style={styles.value}>{unitPrice} TL</Text>
      </View>

      {/* Toplam Tutar */}
      <View style={styles.totalAmountContainer}>
        <Text style={styles.totalAmountLabel}>Toplam Tutar:</Text>
        <Text style={styles.totalAmountValue}>{calculateTotalAmount()} TL</Text>
      </View>

      {/* Kart Bilgileri */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Kart Numarası:</Text>
        <TextInput
          style={styles.input}
          placeholder="Kart numarasını giriniz"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Son Kullanma Tarihi:</Text>
        <TextInput
          style={styles.input}
          placeholder="MM/YYYY"
          value={expirationDate}
          onChangeText={setExpirationDate}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>CVV:</Text>
        <TextInput
          style={styles.input}
          placeholder="CVV numarasını giriniz"
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"
        />
      </View>

      {/* Ödeme Butonu */}
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Ödeme Yap</Text>
      </TouchableOpacity>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginRight: 20, // Sağdan 20 birim uzaklık
    marginLeft: 20,
  },
  totalAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  totalAmountLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  totalAmountValue: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
