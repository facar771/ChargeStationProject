import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const goToMap = () => {
    navigation.navigate('Map');
  };

  const goToBattery = () => {
    navigation.navigate('Battery');
  };

  return (
    <View style={styles.container}>
      <Button title="Haritayı Aç" onPress={goToMap} />
      <Button title="Batarya Durumu" onPress={goToBattery} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
