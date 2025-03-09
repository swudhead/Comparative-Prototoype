import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Modal, Animated, Image } from 'react-native';
import { LogOut, Menu, Map, Code, Settings, Info, CircleUser } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const MapNavHeader: React.FC = () => {
  const [userData, setUserData] = useState({ username: '', fullName: '' });
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarAnim] = useState(new Animated.Value(-300));
  const navigation = useNavigation();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const [username, fullName] = await AsyncStorage.multiGet(['username', 'fullName']);
        setUserData({
          username: username[1] || 'User',
          fullName: fullName[1] || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserData();
  }, []);

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('authToken');
            delete axios.defaults.headers.common['Authorization'];
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
          } catch (error) {
            console.error('Logout error:', error);
            Alert.alert('Error', 'Failed to log out. Please try again.');
          }
        },
      },
    ]);
  };

  const openSidebar = () => {
    setSidebarOpen(true);
    Animated.timing(sidebarAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: -300,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setSidebarOpen(false));
  };

  return (
    <View className="top-10 mb-10 bg-white px-4 py-5 pt-10 shadow-md">
      <View className="flex-row items-center justify-between">
        {/* head */}
        <View className="flex-row items-center">
          <TouchableOpacity onPress={openSidebar} className="p-2">
            <Menu size={20} color="#3B82F6" />
          </TouchableOpacity>
          <Text className="ml-2 text-xl font-bold text-gray-800">Comparative Simulator</Text>
        </View>

        {/* top info */}
        <View className="items-end">
          <Text className="text-sm font-bold text-gray-800">{userData.username}</Text>
          {userData.fullName ? (
            <Text className="text-xs text-gray-600">{userData.fullName}</Text>
          ) : null}
        </View>

        {/* Logout */}
        <TouchableOpacity onPress={handleLogout} className="rounded-full bg-gray-100 p-2 shadow-md">
          <LogOut size={18} color="red" />
        </TouchableOpacity>
      </View>

      {/* side panel */}
      <Modal visible={isSidebarOpen} transparent animationType="none">
        <TouchableOpacity className="absolute inset-0" onPress={closeSidebar} activeOpacity={1} />

        <Animated.View
          style={{ transform: [{ translateX: sidebarAnim }] }}
          className="absolute left-0 top-0 h-full w-64 bg-gray-50 p-5 shadow-lg">
          {/* User Profile Section */}
          <View className="mb-6 flex items-center">
            {/* <Image
              source={{
                uri: "https://via.placeholder.com/80", // Replace with actual user avatar
              }}
              className="h-16 w-16 rounded-full mb-2"
            /> */} 
            <CircleUser size={50} color="#3B82F6" className="mr-2" />
            <Text className="text-lg font-bold text-gray-800">{userData.fullName || 'Guest'}</Text>
            <Text className="text-xs text-gray-500">@{userData.username}</Text>
          </View>

          <Text className="mb-4 text-lg font-bold text-gray-800">Menu</Text>

          {/* Navigation Links */}
          <TouchableOpacity
            onPress={() => navigation.navigate('MapView')}
            className="mb-3 flex-row items-center rounded-md px-3 py-2 hover:bg-gray-200">
            <Map size={18} color="#3B82F6" className="mr-2" />
            <Text className="text-base text-gray-700"> Map View</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Dash')}
            className="mb-3 flex-row items-center rounded-md px-3 py-2 hover:bg-gray-200">
            <Code size={18} color="#3B82F6" className="mr-2" />
            <Text className="text-base text-gray-700"> Algorithm</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            className="mb-3 flex-row items-center rounded-md px-3 py-2 hover:bg-gray-200">
            <Settings size={18} color="#3B82F6" className="mr-2" />
            <Text className="text-base text-gray-700"> Evaluation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('/')}
            className="mb-3 flex-row items-center rounded-md px-3 py-2 hover:bg-gray-200">
            <Info size={18} color="#3B82F6" className="mr-2" />
            <Text className="text-base text-gray-700"> About Project</Text>
          </TouchableOpacity>

          {/* Logout Button in Sidebar */}
          <TouchableOpacity
            onPress={handleLogout}
            className="mt-6 flex-row items-center rounded-md bg-red-500 px-3 py-2">
            <LogOut size={18} color="white" className="mr-2" />
            <Text className="text-base text-white">Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </View>
  );
};

export default MapNavHeader;
