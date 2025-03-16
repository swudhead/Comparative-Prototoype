import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MapPin, BarChart } from 'lucide-react-native';
import WebView from 'react-native-webview';

const TABS = ['Overview', 'Compare Routes', 'Compare Algorithms'];

const Eval = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [loading, setLoading] = useState(true);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <>
            {/* nav */}
            <View className="flex-row justify-between mt-5">
              <View className="w-[48%] rounded-lg bg-white p-4 shadow-md">
                <Text className="text-gray-600">Total Routes</Text>
                <Text className="text-2xl font-bold text-blue-600">12</Text>
              </View>
              <View className="w-[48%] rounded-lg bg-white p-4 shadow-md    ">
                <Text className="text-gray-600">Algorithms</Text>
                <Text className="text-2xl font-bold text-green-600">Test</Text>
              </View>
            </View>

            {/* map */}
            <View className="mt-6">
              <Text className="mb-2 text-lg font-bold text-gray-800">Map Overview</Text>
              <View className="h-60 rounded-lg overflow-hidden">
                <WebView
                  source={require('../../assets/MapboxMap.html')}
                  style={{ flex: 1 }}
                  onLoad={() => setLoading(false)}
                />
              </View>
            </View>
          </>
        );

      case 'Compare Routes':
        return (
          <View className="mt-4">
            <Text className="mb-2 text-lg font-bold text-gray-800">Route Comparison</Text>
            <View className="flex-row justify-between">
              <View className="w-[48%] rounded-lg bg-white p-4 shadow-md">
                <Text className="font-semibold text-gray-700">Route A</Text>
                <Text className="text-gray-600 mt-2">Time: 12 mins</Text>
                <Text className="text-gray-600">Distance: 2.3 km</Text>
                <Text className="text-gray-600">Turns: 5</Text>
              </View>
              <View className="w-[48%] rounded-lg bg-white p-4 shadow-md">
                <Text className="font-semibold text-gray-700">Route B</Text>
                <Text className="text-gray-600 mt-2">Time: 10 mins</Text>
                <Text className="text-gray-600">Distance: 2.1 km</Text>
                <Text className="text-gray-600">Turns: 3</Text>
              </View>
            </View>
          </View>
        );

      case 'Compare Algorithms':
        return (
          <View className="mt-4">
            <Text className="mb-2 text-lg font-bold text-gray-800">Algorithm Performance</Text>
            <View className="flex-row justify-between">
              <View className="w-[48%] rounded-lg bg-white p-4 shadow-md">
                <Text className="font-semibold text-gray-700">A*</Text>
                <Text className="text-gray-600 mt-2">Avg Time: 11.5s</Text>
                <Text className="text-gray-600">Nodes Explored: 45</Text>
              </View>
              <View className="w-[48%] rounded-lg bg-white p-4 shadow-md">
                <Text className="font-semibold text-gray-700">Dijkstra</Text>
                <Text className="text-gray-600 mt-2">Avg Time: 14.2s</Text>
                <Text className="text-gray-600">Nodes Explored: 78</Text>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView className="p-4">
        {/* Title */}
        <Text className="text-xl font-bold text-gray-800">Evaluation</Text>

        {/* Tab Controls */}
        <View className="flex-row justify-between mt-4 bg-white p-2 rounded-lg shadow-sm">
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab}
              className={`flex-1 py-2 rounded-md ${
                activeTab === tab ? 'bg-blue-500' : 'bg-gray-200'
              } mx-1`}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                className={`text-center font-semibold ${
                  activeTab === tab ? 'text-white' : 'text-gray-700'
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View className="mt-4">{renderTabContent()}</View>

        {/* Recent Activities */}
        <View className="mt-6">
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

export default Eval;
