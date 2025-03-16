import React, { useState } from "react";
import { View, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { MapPin, RefreshCw, LogOut } from "lucide-react-native";

const MapScreen = () => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();



  return (
    <View className="flex-1 bg-gray-100">

      {/* <Navbar/> */}
     
      {/* map */}
      <View className="flex-1 border border-gray-300 shadow-lg rounded-lg overflow-hidden relative">
        
        <WebView 
          source={require("../../assets/MapboxMap.html")} 
          style={{ flex: 1 }} 
          onLoad={() => setLoading(false)}
        />

        {/*  loading */}
        {loading && (
          <View className="absolute inset-0 flex items-center justify-center bg-white/50">
            <ActivityIndicator size="large" color="#3B82F6" />
          </View>
        )}
      </View>

      {/* designb */}

      <View className="absolute bottom-6 right-6 space-y-3">
        <TouchableOpacity className="p-4 bg-white rounded-full shadow-md">
          <MapPin size={24} color="#3B82F6" />
        </TouchableOpacity>

        <TouchableOpacity className="p-4 bg-white rounded-full shadow-md">
          <RefreshCw size={24} color="#3B82F6" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapScreen;