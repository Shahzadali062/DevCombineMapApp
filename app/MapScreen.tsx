import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Location {
  latitude: number;
  longitude: number;
  formattedAddress?: string;
}

export default function MapScreen() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // Retrieve the token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          setError('Authentication token is missing');
          setLoading(false);
          return;
        }

        // Fetch locations from the server
        const response = await fetch('http://192.168.54.157:8080/locations', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch locations');
        }

        const data: Location[] = await response.json();

        // Filter out invalid locations (latitude or longitude is zero)
        const validLocations = data.filter(
          (location: Location) => location.latitude !== 0 && location.longitude !== 0
        );
        setLocations(validLocations);
      } catch (error) {
        console.error('Error fetching locations:', error);
        setError('Unable to fetch locations');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.7893, // Latitude for 925 Bush St, San Francisco
          longitude: -122.4108, // Longitude for 925 Bush St, San Francisco
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {locations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          >
            <Callout>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>
                  {location.formattedAddress ? location.formattedAddress : 'Unknown Location'}
                </Text>
                <Text>Tap for more details...</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  calloutContainer: {
    width: 200,
    padding: 8,
  },
  calloutTitle: {
    fontWeight: 'bold',
  },
});

