import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { MapPin } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';

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
      await AsyncStorage.setItem('username', username);

      if (response.data?.user?.fullName) {
        await AsyncStorage.setItem('fullName', response.data.user.fullName);
      } else {
        await AsyncStorage.setItem('fullName', username);
      }

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
    <View className="mt-10 flex-1 bg-white">
      <View className="items-center justify-center bg-white pb-4 pt-12">
        <View className="rounded-full border-2 border-blue-500 bg-blue-100 p-3">
          <MapPin size={32} color="#1a73e8" />
        </View>
        <Text className="mt-2 text-center text-xl font-bold text-black">COMPNAV Prototype</Text>
      </View>

      <View className="h-8">
        <Svg height="100%" width="100%" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <Path d="M0,64 C288,89.3 576,104 1440,64 L1440,120 L0,120 Z" fill="#1a73e8" />
        </Svg>
      </View>

      {/* main */}
      <View className="flex-1 bg-blue-600 px-8 pb-6 pt-4">
        <Text className="mb-8 text-center text-xl font-medium text-white">
          Sign in to your account
        </Text>
        <View className="mb-4">
          <View className="mb-4 flex-row items-center rounded-md bg-white px-3 py-2">
            <TextInput
              className="flex-1 py-2 pl-1 text-gray-800"
              placeholder="Username"
              placeholderTextColor="#9ca3af"
              autoCapitalize="none"
              value={username}
              onChangeText={setEmail}
            />
          </View>

          <View className="flex-row items-center rounded-md bg-white px-3 py-2">
            <TextInput
              className="flex-1 py-2 pl-1 text-gray-800"
              placeholder="Password"
              placeholderTextColor="#9ca3af"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity className="mt-1 self-end">
            <Text className="text-xs text-white">Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className="mt-4 rounded-full bg-white py-3"
            activeOpacity={0.8}>
            {isLoading ? (
              <ActivityIndicator color="#1a73e8" />
            ) : (
              <Text className="text-center font-semibold text-blue-600">Sign In</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            className="mt-4 rounded-full border border-white py-3"
            activeOpacity={0.8}>
            <Text className="text-center font-semibold text-white">Register</Text>
          </TouchableOpacity>
        </View>
    
        <View className="mt-8 flex-row justify-center space-x-2">
          <Text className="px-bottom-4 absolute text-xs text-white">
            Comparative Analysis Navigation Prototype © {new Date().getFullYear()}
          </Text>
        </View>
      </View>
    </View>
  );
}
