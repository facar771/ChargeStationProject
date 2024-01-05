import React from 'react';
import { StyleSheet, View, Button ,TouchableOpacity, Image, Text, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const goToMap = () => {
    navigation.navigate('Map');
  };

  const goToBattery = () => {
    navigation.navigate('Battery');
  };

  const goToQR = () => {
    navigation.navigate('QRcode');
  };

  const MyAccount = () => {
    navigation.navigate('Account');
  };

  const MyPayment = () => {
    navigation.navigate('Payment');
  };

  const MyPayment2 = () => {
    navigation.navigate('Payment2');
  };

  const Payment3 = () => {
    navigation.navigate('ReservationDetailsScreen');
  };

  const MyReservation = () => {
    navigation.navigate('MyReservations');
  };

  const WarningScreen = () => {
    navigation.navigate('WarningScreen');
  };

  const WebApi = () => {
    navigation.navigate('WebApi');
  };

  return (
    <View style={styles.container}>

      <View style={styles.kenarliContainer}>
        <Text style={styles.buttonTextUst}>Hoşgeldin Kullanıcı</Text>
      </View>

      <View style={styles.containerGenis}>
        <TouchableOpacity onPress={MyAccount} style={styles.buttonGenis}>
          <Image source={require('./images/profile.png')} style={styles.buttonImageGenis} />
          <Text style={styles.buttonTextGenis}>Hesabım</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.buttonGenis}>
          <Image source={require('./images/creditCard.png')} style={styles.buttonImageGenis} />
          <Text style={styles.buttonTextGenis}>Ödeme Bilgilerim</Text>
        </TouchableOpacity> 
        <TouchableOpacity onPress={MyReservation} style={styles.buttonGenis}>
          <Image source={require('./images/reservation.png')} style={styles.buttonImageGenis} />
          <Text style={styles.buttonTextGenis}>Rezervasyonlarım</Text>
        </TouchableOpacity> 
        <TouchableOpacity onPress={WebApi} style={styles.buttonGenis}>
          <Image source={require('./images/tl2.png')} style={styles.buttonImageGenis} />
          <Text style={styles.buttonTextGenis}>Fiyatlandırma</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonGenis}>
          <Image source={require('./images/setting.png')} style={styles.buttonImageGenis} />
          <Text style={styles.buttonTextGenis}>Ayarlar</Text>
        </TouchableOpacity> 
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={goToMap} style={styles.buttonHome}>
          <Image source={require('./images/home.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Anasayfa</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToQR} style={styles.buttonCharge}>
          <Image source={require('./images/charge2.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Şarj</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToBattery} style={styles.buttonProfile}>
          <Image source={require('./images/profile2.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonContainer: {
    backgroundColor: 'rgba(200, 200, 200, 1)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    height: 60, 
  },
  buttonHome: {
    alignItems: 'center',
    right: 15,
  },
  buttonCharge: {
    alignItems: 'center',
    right: 15,
  },
  buttonProfile: {
    alignItems: 'center',
    right: 0,
  },
  buttonImage: {
    width: 30,
    height: 30,
    marginBottom: 0,
  },
  buttonImageGenis: {
    width: 30,
    height: 30,
    left: 10,
    marginRight: 20,
  },
  buttonText: {
    fontSize: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonGenis: {
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    width: '90%',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    marginVertical: 20,
  },
  buttonTextGenis: {
    color: 'black',
    fontSize: 16,
  },
  buttonTextUst: {
    color: 'black',
    fontSize: 30,
  },
  containerGenis: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kenarliContainer: {
    backgroundColor: 'lightgrey',
    borderWidth: 3,
    borderRadius: 40,
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default ProfileScreen;