import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, Button, Image, TouchableOpacity, Text, Linking } from 'react-native';
import MapView, { Marker, Callout, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import axios from 'axios';

const MapScreen = () => {
  const [mapLayout, setMapLayout] = useState(true);
  const [initialRegion, setInitialRegion] = useState(null);
  const navigation = useNavigation();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [mapKey, setMapKey] = useState(0);
  const [isMapReady, setIsMapReady] = useState(false);
  const mapRef = useRef(null); 

  const fetchMarkersFromServer = async () => {
    try {
      const response = await axios.get('http://45.141.151.31:5000/api/chargestation/getstationall');
      const data = response.data;
      const updatedMarkers = data.map(item => ({
        id: item.id,
        coordinate: {
          latitude: parseFloat(item.location.split(',')[0]),
          longitude: parseFloat(item.location.split(',')[1]),
        },
        title: item.qrCode,
        status: item.chargeConfirm,
        image: require('./images/chargeStation.jpg'),
      }));
      setMarkers(updatedMarkers);
      console.log('İstek başarılı:', updatedMarkers);

      setIsMapReady(true); 
    } catch (error) {
      console.log('İstek hatası:', error);
    }
  };

  const goToMap = () => {
    navigation.navigate('Map');
  };

  const goToBattery = () => {
    navigation.navigate('Battery');
  };

  const goToQR = () => {
    navigation.navigate('QRcode');
  };

  const MyReservation = () => {
    navigation.navigate('Reservation', { stationId: marker.id });
  };

  const handleMapLayout = () => {
    setMapLayout(true);
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

  const handleRefresh = () => {
    fetchMarkersFromServer();
    setMapKey(mapKey + 1);
  };

  const handleButtonPress = () => {
    goToMap();
    handleRefresh();
  };

  const handleGoogleMapsRedirect = (marker) => {
    const { latitude, longitude } = marker.coordinate;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  useEffect(() => {
    (async () => {
      try {
        await Location.requestForegroundPermissionsAsync();
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        const region = {
          latitude,
          longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.05,
        };
        setInitialRegion(region);
        fetchMarkersFromServer();
      } catch (error) {
        console.log('Konum alınamadı', error);
      }
    })();
  }, []);

  const renderMarkers = (markers) => {
    return markers.map(marker => (
      <Marker
        key={marker.id}
        coordinate={marker.coordinate}
        title={marker.title}
        pinColor={marker.status ? 'green' : 'red'}
        onPress={() => handleMarkerPress(marker)}
      />
    ));
  };

  const focusToCoordinates = () => {
    const latitude = 39.706548665108954;
    const longitude = 37.03999050242504;
    const coordinate = {
      latitude,
      longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.05,
    };
    mapRef.current.animateToRegion(coordinate, 1000); 
  };

  return (
    <View style={styles.container}>
      {mapLayout && initialRegion && isMapReady && (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          key={mapKey}
          style={styles.map}
          initialRegion={initialRegion}
          onLayout={() => {
            handleMapLayout();
          }}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          <Circle
            center={initialRegion}
            radius={1000}
            strokeColor={'rgba(0, 122, 255, 0.5)'}
            fillColor={'rgba(0, 122, 255, 0.2)'}
          />
          {renderMarkers(markers)}
        </MapView>
      )}

      {selectedMarker && (
        <View style={styles.markerDetailsContainer}>
          <Image source={selectedMarker.image} style={styles.image} />
          <Text style={styles.title}>{selectedMarker.title}</Text>
          <Text style={styles.description}>{selectedMarker.description}</Text>
          <View style={styles.buttonContainer2}>
            <Button title="Rezervasyon" onPress={() => navigation.navigate('Reservation', { stationId: selectedMarker.id , stationCoordinate: selectedMarker.coordinate})} />
            <Button title="Kapat" onPress={() => setSelectedMarker(null)} />
            <Button title="Harita" onPress={() => handleGoogleMapsRedirect(selectedMarker)} />
          </View>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleButtonPress} style={styles.buttonHome}>
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

      {/* Yeni eklenen buton */}
      <TouchableOpacity onPress={focusToCoordinates} style={styles.buttonFocus}>
        <Image source={require('./images/charge.png')} style={styles.buttonImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  markerDetailsContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
  },
  image: {
    width: 325,
    height: 150,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
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
    height: 65,
  },
  buttonContainer2: {
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
  buttonText: {
    fontSize: 12,
  },
  buttonFocus: {
    backgroundColor: 'rgba(200, 200, 200, 0.5)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    position: 'absolute',
    top: 100, // Move the button to the top
    right: 10, // Move the button to the right
    width: 40, // Set the width to make the button square
    height: 40, // Set the height to make the button square
  },
});

export default MapScreen;
