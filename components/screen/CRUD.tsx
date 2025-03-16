import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Alert,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { MapPin, RefreshCcw, Edit, Trash2 } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';

export default function UserListScreen() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newFullname, setNewFullname] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newTypeId, setNewTypeId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      let token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'No authentication token found. Please log in.');
        return;
      }

      const response = await fetch('https://devapi-618v.onrender.com/api/user', {
        method: 'GET',
        headers: {
          Authorization: token,
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error tols! Status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error);
      Alert.alert('Error', error.message || 'Failed to fetch users. Please try again.');
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // prep
  const prepareUpdateForm = (user) => {
    setSelectedUser(user);
    setNewFullname(user.fullname || '');
    setNewUsername(user.username || '');
    setNewPassword('');
    setNewTypeId(user.type_id ? user.type_id.toString() : '');
    setModalVisible(true);
  };

  const [infoModalVisible, setInfoModalVisible] = useState(false);

  const userInfo = (user) => {
    setSelectedUser(user);
    setInfoModalVisible(true);
  };

  // default
  const handleUpdateUser = async () => {
    if (!selectedUser) {
      Alert.alert('Error', 'No user selected.');
      return;
    }

    // Validate required fields
    if (!newFullname.trim()) {
      Alert.alert('Error', 'Please enter a valid name.');
      return;
    }

    let token = await AsyncStorage.getItem('authToken');
    if (!token) {
      Alert.alert('Error', 'No authentication token found. Please log in.');
      return;
    }

    // Prepare update data with defaults
    const updateData = {
      fullname: newFullname.trim(),
      username: newUsername.trim() || selectedUser.username,
      // Only include password if it's been changed
      ...(newPassword.trim() ? { password: newPassword.trim() } : {}),
      type_id: newTypeId ? parseInt(newTypeId) : selectedUser.type_id,
    };

    console.log('Updating User ID:', selectedUser.id);
    console.log('Update data:', updateData);

    try {
      const response = await fetch(`https://devapi-618v.onrender.com/api/user/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (response.ok) {
        Alert.alert('Success', 'User updated successfully!');
        setModalVisible(false);
        fetchUsers();
      } else {
        throw new Error(`Server error: ${response.status}`);
      }
    } catch (error) {
      console.error('Update error:', error.message);
      Alert.alert('Error', error.message || 'Failed to update user. Please try again.');
    }
  };

  // Delete User
  const handleDeleteUser = async (id) => {
    Alert.alert('Confirm', 'Are you sure you want to delete this user?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            let token = await AsyncStorage.getItem('authToken');
            if (!token) {
              Alert.alert('Error', 'No authentication token found. Please log in.');
              return;
            }

            const response = await axios.delete(`https://devapi-618v.onrender.com/api/user/${id}`, {
              headers: { Authorization: token },
            });

            if (response.status === 200) {
              Alert.alert('Success', 'User deleted successfully!');
              fetchUsers(); // Refresh user list
            }
          } catch (error) {
            Alert.alert('Error', 'Failed to delete user.');
            console.error('Delete error:', error);
          }
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="items-center justify-center bg-white pb-4 ">
        <View className="rounded-full border-2 border-blue-500 bg-blue-100 p-3">
          <MapPin size={32} color="#1a73e8" />
        </View>
        <Text className="mt-2 text-center text-xl font-bold text-black">P3 CRUD Operation</Text>
      </View>

      {/* love is awave */}
      <View className="h-8">
        <Svg height="100%" width="100%" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <Path d="M0,64 C288,89.3 576,104 1440,64 L1440,120 L0,120 Z" fill="#1a73e8" />
        </Svg>
      </View>

      {/* main listings */}
      <View className="flex-1 bg-blue-600 px-8 pb-6 pt-4">
        <Text className="mb-4 text-center text-xl font-medium text-white">User Listings</Text>

        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : error ? (
          <View className="items-center">
            <Text className="mb-4 text-center text-red-200">Failed to load users.</Text>
            <TouchableOpacity
              onPress={fetchUsers}
              className="flex-row items-center rounded-lg bg-white p-2 shadow-md">
              <RefreshCcw size={18} color="#1a73e8" />
              <Text className="ml-2 font-medium text-blue-600">Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="mb-4 rounded-lg bg-white p-4 shadow-md">
                <Text className="text-lg font-bold text-blue-600">{item.fullname}</Text>
                <Text className="text-gray-700">Username: {item.username}</Text>
                <Text className="text-gray-500">
                  Created: {new Date(item.created_at).toLocaleDateString()}
                </Text>

                {/* buttin */}
                <View className="mt-2 flex-row-reverse">
                  <TouchableOpacity
                    className="rounded-lg bg-red-500 px-4 py-2"
                    onPress={() => handleDeleteUser(item.id)}>
                    <View className="flex-row items-center">
                      <Trash2 size={16} color="#fff" />
                      <Text className="ml-2 text-white">Delete</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="mr-2 rounded-lg bg-blue-500 px-4 py-2"
                    onPress={() => prepareUpdateForm(item)}>
                    <View className="flex-row items-center">
                      <Edit size={16} color="#fff" />
                      <Text className="ml-2 text-white">Update</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="mr-4 bg-slate-500 p-3 py-2"
                    onPress={() => userInfo(item)}>
                    <View className="flex-row items-center">
                      {/* <Edit size={16} color="#fff" /> */}
                      <Text className="text-white">User Info</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>

      <Modal visible={infoModalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 items-center justify-center bg-black/50 backdrop-blur-md">
          <View className="w-80 rounded-lg bg-white p-6">
            <Text className="mb-4 text-lg font-bold">User Details</Text>

            <Text className="text-gray-700">
              <Text className="font-bold">ID:</Text> {selectedUser?.id}
            </Text>
            <Text className="text-gray-700">
              <Text className="font-bold">Fullname:</Text> {selectedUser?.fullname}
            </Text>
            <Text className="text-gray-700">
              <Text className="font-bold">Username:</Text> {selectedUser?.username}
            </Text>
            <Text className="text-gray-700">
              <Text className="font-bold">Created At:</Text>{' '}
              {selectedUser?.created_at
                ? new Date(selectedUser.created_at).toLocaleString()
                : 'N/A'}
            </Text>
            <Text className="text-gray-700">
              <Text className="font-bold">Updated At:</Text>{' '}
              {selectedUser?.updated_at
                ? new Date(selectedUser.updated_at).toLocaleString()
                : 'N/A'}
            </Text>

            {/* Close Button */}
            <TouchableOpacity
              onPress={() => setInfoModalVisible(false)}
              className="mt-4 rounded-md bg-blue-500 p-3">
              <Text className="text-center text-white">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* update */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 items-center justify-center bg-black/50 backdrop-blur-md">
          <View className="w-80 rounded-lg bg-white p-6">
            <Text className="mb-4 text-lg font-bold">Update User</Text>

            {/*  fullname */}
            <Text className="mb-1 text-gray-700">Fullname</Text>
            <TextInput
              className="mb-4 rounded-md border border-gray-300 p-2"
              value={newFullname}
              onChangeText={setNewFullname}
              placeholder="Enter new fullname"
            />

            {/* username */}
            <Text className="mb-1 text-gray-700">Username</Text>
            <TextInput
              className="mb-4 rounded-md border border-gray-300 p-2"
              value={newUsername}
              onChangeText={setNewUsername}
              placeholder={`Enter username (current: ${selectedUser?.username})`}
            />

            {/* pass */}
            <Text className="mb-1 text-gray-700">Password</Text>
            <TextInput
              className="mb-4 rounded-md border border-gray-300 p-2"
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter password (Required)"
              secureTextEntry={true}
            />

            {/* type id */}
            <Text className="mb-1 text-gray-700">User Type</Text>
            <TextInput
              className="mb-4 rounded-md border border-gray-300 p-2"
              value={newTypeId}
              onChangeText={setNewTypeId}
              placeholder={`Enter user type ID`}
              keyboardType="numeric"
            />

            {/* save */}
            <TouchableOpacity onPress={handleUpdateUser} className="rounded-md bg-blue-500 p-3">
              <Text className="text-center text-white">Save</Text>
            </TouchableOpacity>

            {/* canc */}
            <TouchableOpacity onPress={() => setModalVisible(false)} className="mt-2 p-2">
              <Text className="text-center text-red-500">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
