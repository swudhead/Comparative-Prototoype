import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Modal, Animated } from 'react-native';
import { LogOut, Menu } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

interface MapNavHeaderProps {}

const MapNavHeader: React.FC<MapNavHeaderProps> = () => {
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
        {/* title */}
        <View className="flex-row items-center">
          <TouchableOpacity onPress={openSidebar} className="p-2">
            <Menu size={20} color="#3B82F6" />
          </TouchableOpacity>
          <Text className="ml-2 text-xl font-bold text-gray-800">Comparative Simulator</Text>
        </View>

        {/* user */}
        <View className="items-end">
          <Text className="text-sm font-bold text-gray-800">{userData.username}</Text>
          {userData.fullName ? (
            <Text className="text-xs text-gray-600">{userData.fullName}</Text>
          ) : null}
        </View>

        {/* logout  */}
        <TouchableOpacity onPress={handleLogout} className="rounded-full p-2 bg-gray-100 shadow-md">
          <LogOut size={18} color="red" />
        </TouchableOpacity>
      </View>

      {/* sidebar */}
      <Modal visible={isSidebarOpen} transparent animationType="none">

        <TouchableOpacity className="absolute inset-0" onPress={closeSidebar} activeOpacity={1} />

        <Animated.View style={{ transform: [{ translateX: sidebarAnim }] }} className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg p-5">
          <TouchableOpacity onPress={closeSidebar} className="self-end mb-4"></TouchableOpacity>
          <Text className="text-lg font-bold text-gray-800 mb-4">Navigation</Text>
          <TouchableOpacity onPress={() => navigation.navigate('MapView')} className="mb-3 px-3 py-2 rounded-md hover:bg-gray-200">
            <Text className="text-gray-700 text-base">Mapview</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Dash')} className="mb-3 px-3 py-2 rounded-md hover:bg-gray-200">
            <Text className="text-gray-700 text-base">Algorithm</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')} className="mb-3 px-3 py-2 rounded-md hover:bg-gray-200">
            <Text className="text-gray-700 text-base">Evaluation</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('/')} className="mb-3 px-3 py-2 rounded-md hover:bg-gray-200">
            <Text className="text-gray-700 text-base">About Project</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </View>
  );
};

export default MapNavHeader;
