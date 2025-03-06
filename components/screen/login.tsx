import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { MapPin } from 'lucide-react-native';
import MapBG from '../../assets/map.jpg'

export default function LoginScreen() {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          navigation.reset({
            index: 0,
            routes: [{ name: 'MapView' }],
          });
        }
      } catch (error) {
        console.error('Error checking token:', error);
      }
    };

    checkToken();
  }, []);

  const handleLogin = async () => {
    if (!password) {
      Alert.alert('Invalid Password', 'Please enter your password');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('https://devapi-618v.onrender.com/api/auth/login', {
        username,
        password,
      });
      const token = response.data?.token;

      if (!token) {
        throw new Error('No token received from server');
      }

      await AsyncStorage.setItem('authToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      Alert.alert('Success', 'Login successful!');
      navigation.replace('MapView');
    } catch (error) {
      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (error.response) {
        errorMessage = error.response.data?.message || 'Invalid username or password';
      } else if (error.request) {
        errorMessage = 'Network error. Please check your internet connection.';
      }

      Alert.alert('Login Failed', errorMessage);
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-slate-50">
      {/* design */}
      <ImageBackground
        source={MapBG}
        className="absolute inset-0 h-full w-full opacity-90"
        resizeMode="cover"
        blurRadius={5}
      />

      {/* login */}
      <View className="w-11/12 max-w-md rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-lg">
        <View className="mb-4 items-center">
          <View className="rounded-full bg-blue-100 p-3">
            <MapPin size={32} color="#3B82F6" />
          </View>
          <Text className="mt-2 text-center text-2xl font-bold">
            Comparative Analysis Navigation Prototype
          </Text>
          <Text className="mt-2 text-center text-sm text-gray-500">
            Navigation Simulator for Thesis
          </Text>
        </View>

        <View className="space-y-4">
          <View>
            <Text className="font-medium text-gray-700">Username</Text>
            <TextInput
              className="mt-1 rounded-lg border border-gray-300 bg-white px-4 py-3"
              placeholder="your username"
              autoCapitalize="none"
              value={username}
              onChangeText={setEmail}
            />
          </View>

          <View>
            <Text className="font-medium text-gray-700">Password</Text>
            <TextInput
              className="mt-1 rounded-lg border border-gray-300 bg-white px-4 py-3"
              placeholder="••••••••"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View>
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              className="mt-5 flex items-center justify-center rounded-lg bg-blue-600 py-3">
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="font-semibold text-white">Login</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Text className="absolute bottom-4 text-xs text-gray-500">
        Comparative Analysis Navigation Prototype © {new Date().getFullYear()}
      </Text>
    </View>
  );
}
