import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const kebabShops = [
  {
    id: '1',
    name: 'Kebab Shop 1',
    latitude: 53.3498,
    longitude: -6.2603,
  },
  {
    id: '2',
    name: 'Kebab Shop 2',
    latitude: 53.3445,
    longitude: -6.2672,
  },
  {
    id: '3',
    name: 'Kebab Shop 3',
    latitude: 53.3535,
    longitude: -6.2552,
  },
];

export default function HomeScreen() {
  const mapRef = useRef<MapView>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );

  useEffect(() => {
    async function getLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});

      setLocation(currentLocation);
    }

    getLocation();
  }, []);

  useEffect(() => {
    if (!location) return;

    mapRef.current?.animateToRegion(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      },
      1000,
    );
  }, [location]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation
        showsMyLocationButton
        initialRegion={{
          latitude: location?.coords.latitude ?? 53.3498,
          longitude: location?.coords.longitude ?? -6.2603,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
      >
        {kebabShops.map((shop) => (
          <Marker
            key={shop.id}
            coordinate={{
              latitude: shop.latitude,
              longitude: shop.longitude,
            }}
            title={shop.name}
          />
        ))}
      </MapView>

      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>KEBAPP</Text>
          <Text style={styles.subtitle}>Find your next kebab</Text>
        </View>

        <Pressable style={styles.profileButton}>
          <Text style={styles.profileIcon}>👤</Text>
        </Pressable>
      </View>

      <Pressable style={styles.search}>
        <Text style={styles.searchIcon}>⌕</Text>
        <Text style={styles.searchText}>Search kebab shops...</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FF6B35',
    letterSpacing: 1,
  },

  subtitle: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  profileButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#1C1C1C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },

  profileIcon: {
    fontSize: 20,
  },

  search: {
    position: 'absolute',
    top: 125,
    left: 20,
    right: 20,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    elevation: 5,
  },

  searchIcon: {
    fontSize: 27,
    color: '#666666',
    marginRight: 10,
  },

  searchText: {
    fontSize: 15,
    color: '#777777',
  },
});
