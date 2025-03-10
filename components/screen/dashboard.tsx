import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Menu, MapPin, BarChart, Activity } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import WebView from 'react-native-webview';

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      {/* <View className="bg-white px-4 py-5 shadow-md flex-row items-center justify-between">
        <TouchableOpacity onPress={() => setSidebarOpen(true)} className="p-2">
          <Menu size={24} color="#3B82F6" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">Comparative Dashboard</Text>
      </View> */}

      <ScrollView className="p-4">
        <View className="flex-row justify-between">
          <View className="w-[48%] rounded-lg bg-white p-4 shadow-md">
            <Text className="text-gray-600">Total Routes</Text>
            <Text className="text-2xl font-bold text-blue-600">12</Text>
          </View>
          <View className="w-[48%] rounded-lg bg-white p-4 shadow-md">
            <Text className="text-gray-600">Algorithms</Text>
            <Text className="text-2xl font-bold text-green-600">Test</Text>
          </View>
        </View>

        {/* map */}
        <View className="mt-4">
          <Text className="mb-2 text-lg font-bold text-gray-800">Map Overview</Text>
          <WebView
            source={require('../../assets/MapboxMap.html')}
            style={{ flex: 1 }}
            onLoad={() => setLoading(false)}
          />
        </View>

        {/*  Activities */}
        <View className="mt-4">
          <Text className="mb-2 text-lg font-bold text-gray-800">Recent</Text>
          <View className="rounded-lg bg-white p-4 shadow-md">
            <View className="mb-2 flex-row items-center">
              <MapPin size={20} color="#3B82F6" /> 
              <Text className="ml-2 text-gray-700">Route: Plaza ➝ NCF</Text>
            </View>
            <View className="flex-row items-center">
              <BarChart size={20} color="#10B981" />
              <Text className="ml-2 text-gray-700">Algorithm: A*</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
