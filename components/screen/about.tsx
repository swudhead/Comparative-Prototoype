import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Activity, Code, TrendingUp, Zap } from 'lucide-react-native';

const AboutProject = () => {
  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView className="p-4">
        <Text className="text-xl font-bold text-gray-800">About the Project</Text>

        <View className="mt-4 rounded-lg bg-white p-4 shadow-md">
          <Text className="text-lg font-semibold text-gray-800 mb-2">Project Summary</Text>
          <Text className="text-gray-700">
            This project is a Comparative Analysis Navigation System that evaluates multiple pathfinding algorithms
            over transporation routes of tricycle across Naga City to determine optimal efficiency in terms of shortest path, efficiency, and node traversal.
          </Text>
        </View>

        <View className="mt-4 rounded-lg bg-white p-4 shadow-md">
          <View className="flex-row items-center mb-2">
            <Activity size={20} color="#6366F1" />
            <Text className="ml-2 text-lg font-semibold text-gray-800">Objective & Methodology</Text>
          </View>
          <Text className="text-gray-700">
            The goal is to simulate various navigation algorithms (such as A*, Dijkstra, D*. D* Lite algorithms) across preset routes within
            the transportation network of Naga City. Data like travel time, number of turns, and efficiency are collected via a custom
            Mapbox integration and compared through structured metrics.
          </Text>
        </View>

        <View className="mt-4 rounded-lg bg-white p-4 shadow-md">
          <View className="flex-row items-center mb-2">
            <Code size={20} color="#10B981" />
            <Text className="ml-2 text-lg font-semibold text-gray-800">Technologies Used</Text>
          </View>
          <Text className="text-gray-700">
            - React Native {'\n'}
            - Mapbox GL JS via WebView {'\n'}
            - Tailwind CSS (via NativeWind) {'\n'}
            - Lucide Icons {'\n'}
            - Pathfinding algorithms: A*, Dijkstra
          </Text>
        </View>

        <View className="mt-4 rounded-lg bg-white p-4 shadow-md">
          <View className="flex-row items-center mb-2">
            <TrendingUp size={20} color="#F59E0B" />
            <Text className="ml-2 text-lg font-semibold text-gray-800">Comparative Focus</Text>
          </View>
          <Text className="text-gray-700">
            The core of this project lies in analyzing how different algorithms perform under identical conditions.
            Key performance indicators include route time, computation efficiency, and real-time responsiveness.
          </Text>
        </View>

        <View className="mt-4 rounded-lg bg-white p-4 shadow-md mb-6">
          <View className="flex-row items-center mb-2">
            <Zap size={20} color="#EF4444" />
            <Text className="ml-2 text-lg font-semibold text-gray-800">Future Enhancements</Text>
          </View>
          <Text className="text-gray-700">
            - Integrate live traffic or obstacle data {'\n'}
            - Support additional algorithms like BFS/DFS or Genetic Pathfinding {'\n'}
            - Export analysis as PDF reports {'\n'}
            - Improve UI with real-time map interactions
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutProject;
