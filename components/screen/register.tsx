import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MapPin } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';

export default function RegisterScreen() {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [type_id, setType_id] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!fullname || !username || !password || !type_id) {
      Alert.alert('Missing Fields', 'Please fill in all fields');
      return;
    }

    const payload = {
      fullname,
      username,
      password,
      type_id: parseInt(type_id),
    };

    try {
      setIsLoading(true);
      const response = await fetch('https://devapi-618v.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Response:', data);

      if (response.ok) {
        Alert.alert('Success', 'Registration successful!');
        navigation.replace('Login');
      } else {
        Alert.alert('Registration Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Register error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
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

      {/* form container */}
      <View className="flex-1 bg-blue-600 px-8 pb-6 pt-4">
        <Text className="mb-6 text-center text-xl font-medium text-white">
          Create your account
        </Text>

        <View className="space-y-4">
          <View className="rounded-md bg-white px-3 mb-5 py-2">
            <TextInput
              placeholder="Full Name"
              value={fullname}
              onChangeText={setFullname}
              className="text-gray-800"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View className="rounded-md bg-white mb-5 px-3 py-2">
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              className="text-gray-800"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View className="rounded-md bg-white mb-5 px-3 py-2">
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="text-gray-800"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View className="rounded-md bg-white px-3 py-2">
            <TextInput
              placeholder="Type ID (e.g. 1)"
              value={type_id}
              onChangeText={setType_id}
              keyboardType="numeric"
              className="text-gray-800"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <TouchableOpacity
            onPress={handleRegister}
            disabled={isLoading}
            className="mt-10 rounded-full bg-white py-3"
            activeOpacity={0.8}>
            {isLoading ? (
              <ActivityIndicator color="#1a73e8" />
            ) : (
              <Text className="text-center font-semibold text-blue-600">Register</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className="mt-4 rounded-full border border-white py-3"
            activeOpacity={0.8}>
            <Text className="text-center font-semibold text-white">Back to Login</Text>
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
