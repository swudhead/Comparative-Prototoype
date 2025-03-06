import React from "react";
import { View, Text } from "react-native";
import MapboxGL from '@rnmapbox/maps';
import Constants from "expo-constants";

const MAPBOX_ACCESS_TOKEN = Constants.expoConfig?.extra?.MAPBOX_ACCESS_TOKEN;

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

const MapScreen = () => {
  return (
     <View className="flex-1 justify-center items-center bg-gray-100">
      <View className="h-72 w-72 rounded-lg overflow-hidden border border-gray-300 shadow-md">
        <MapboxGL.MapView className="flex-1" />
        <Text className="font-bold">
          Hello World
        </Text>
      </View>
    </View>
  );
};

export default MapScreen;
