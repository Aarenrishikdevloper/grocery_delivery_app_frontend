import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {useAuthStore} from '@state/authstore';
import {MAP_API_KEY} from '@service/config';
import {
  MapView,
  Camera,
  MarkerView,
  ShapeSource,
  LineLayer,
} from '@maplibre/maplibre-react-native';
import {getPoints} from '@utils/getPoints';
import {Colors} from '@utils/Constants';

interface MapComponentProps {
  mapRef: any;
  setMapRef: (ref: any) => void;
  hasAccepted: any;
  deliveryLocation: any;
  pickupLocation: any;
  deliveryPersonLocation: any;
  hasPickedUp: any;
}

const MapViewComponent = ({
  mapRef,
  setMapRef,
  hasAccepted,
  hasPickedUp,

  deliveryLocation,
  pickupLocation,
  deliveryPersonLocation,
}: MapComponentProps) => {
  const {user, setCurrentOrder} = useAuthStore();
  
 
  const polylinepoints = getPoints([pickupLocation, deliveryLocation]);
  
  const polylineGeoJSON = {
    type: 'Feature' as const, // Use the literal type 'Feature'
    geometry: {
      type: 'LineString' as const, // Use the literal type 'LineString'
      coordinates: polylinepoints.map(point => [
        point.longitude,
        point.latitude,
      ]), // GeoJSON uses [longitude, latitude]
    },
    properties: {}, // Ensure properties are added
  };
  const places = [
     {longitude:deliveryLocation.longitude, latitude:deliveryLocation.latitude},  
     {longitude:hasAccepted?pickupLocation.longitude:deliveryLocation.longitude, latitude:hasAccepted?pickupLocation.latitude:deliveryLocation.latitude}
  ]
  const polylinepoint = getPoints(places);
  const polylineGeoJSON2 = {
    type: 'Feature' as const,
    geometry: {
      type: 'LineString' as const,
      coordinates: polylinepoint.map(point=> [point.longitude, point.latitude]), // GeoJSON uses [longitude, latitude]
    },
    properties:{}
  };
    
  
 
  const customMapStyle = {
    version: 8,
    sources: {
        'openstreetmap-tiles': {
            type: 'raster',
            tiles: [
                'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', // OpenStreetMap tile URL
                'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png', // Mirror 1
                'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png', // Mirror 2
            ],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors', // Proper attribution for OpenStreetMap
        },
    },
    layers: [
        {
            id: 'openstreetmap-tiles-layer',
            type: 'raster',
            source: 'openstreetmap-tiles',
        },
    ],
};

  return (
    <>
      <MapView
        mapStyle={customMapStyle} // Use OpenStreetMap tiles
        style={{flex: 1}}
        compassEnabled={false}>
        <Camera
          centerCoordinate={[
            user?.livelocation?.longitude,
            user?.livelocation?.latitude,
          ]}
          zoomLevel={12}
        />
        {deliveryLocation && (
          <MarkerView
            id="location-marker"
            coordinate={[deliveryLocation.longitude, deliveryLocation.latitude]}
            children={
              <Image
                source={require('@assets/icons/my_pin.png')}
                style={{width: 20, height: 20}}
              />
            }
          />
        )}
        {pickupLocation && (
          <MarkerView
            id="store-marker"
            coordinate={[pickupLocation.longitude, pickupLocation.latitude]}
            children={
              <Image
                source={require('@assets/icons/store.png')}
                style={{width: 20, height: 20}}
              />
            }
          />
        )}
        {deliveryPersonLocation.latitude !== 0 &&
          deliveryPersonLocation.longitude !== 0 && (
            <MarkerView
              id="deliverson-marker"
              coordinate={[
                deliveryPersonLocation.longitude,
                deliveryLocation.latitude,
              ]}
              children={
                <Image
                  source={require('@assets/icons/delivery.png')}
                  style={{
                    width: 20,
                    height: 20,
                    position: 'absolute',
                    zIndex: 90,
                  }}
                />
              }
            />
          )}
        
        {deliveryLocation && pickupLocation && !hasPickedUp && !hasAccepted&&(
        <ShapeSource id="polylineSource1" shape={polylineGeoJSON}>
          <LineLayer
            id="polyLineLayer1"
            style={{
              lineColor:Colors.text,
              lineWidth:2, 
              lineDasharray:[12,10]
              
            }}
          />
        </ShapeSource>
      )}

      {/* Show the active route segment (conditional) */}
      {deliveryLocation && pickupLocation && (hasAccepted || hasPickedUp) && (
        <ShapeSource id="polylineSource2" shape={polylineGeoJSON2}>
          <LineLayer
            id="polyLineLayer2"
            style={{
              lineColor: "#2871F2", // Different color for active segment
              lineWidth: 5, // Thicker than the base line
              lineOpacity: 1,
              // Remove lineDasharray for solid line
            }}
          />
        </ShapeSource>
      )}
       
      </MapView>
    </>
  );
};

export default MapViewComponent;

const styles = StyleSheet.create({});
