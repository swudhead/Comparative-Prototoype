import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Menu, MapPin, BarChart, Activity } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      {/* <View className="bg-white px-4 py-5 shadow-md flex-row items-center justify-between">
        <TouchableOpacity onPress={() => setSidebarOpen(true)} className="p-2">
          <Menu size={24} color="#3B82F6" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">Comparative Dashboard</Text>
      </View> */}

      {/* Dashboard Content */}
      <ScrollView className="p-4">
        {/* Summary Cards */}
        <View className="flex-row justify-between">
          <View className="bg-white p-4 rounded-lg shadow-md w-[48%]">
            <Text className="text-gray-600">Total Routes</Text>
            <Text className="text-2xl font-bold text-blue-600">12</Text>
          </View>
          <View className="bg-white p-4 rounded-lg shadow-md w-[48%]">
            <Text className="text-gray-600">Algorithms</Text>
            <Text className="text-2xl font-bold text-green-600">Test</Text>
          </View>
        </View>

        {/* Map Section */}
        <View className="mt-4">
          <Text className="text-lg font-bold text-gray-800 mb-2">Map Overview</Text>
    
        </View>

        {/* Recent Activities */}
        <View className="mt-4">
          <Text className="text-lg font-bold text-gray-800 mb-2">Recent Activity</Text>
          <View className="bg-white p-4 rounded-lg shadow-md">
            <View className="flex-row items-center mb-2">
              <MapPin size={20} color="#3B82F6" />
              <Text className="ml-2 text-gray-700">Route: Plaza ➝ University</Text>
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
