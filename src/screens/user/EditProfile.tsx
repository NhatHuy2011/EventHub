import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getBio } from '../../lib/redux/reducers/user.reducer';
import { RootState } from '../../lib/redux/rootReducer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppDispatch } from '../../lib/redux/store';
import DocumentPicker from 'react-native-document-picker';
import api from '../../lib/api/api';

const EditProfile = () => {
  const navigation = useNavigation();

  const dispatch: AppDispatch = useDispatch<AppDispatch>();


  const { bio, loading, error } = useSelector((state: RootState) => state.user);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getBio());
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    console.log('Đã đăng xuất');
    navigation.navigate('LoginScreen');
  };

  const handleEditAvatar = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      
      console.log('Ảnh đã chọn:', res.uri);
      setSelectedImage(res.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Hủy chọn ảnh');
      } else {
        console.log('Lỗi khi chọn ảnh:', err);
      }
    }
  };  

  const handleUpdateProfile = async () => {
    if (!bio || !selectedImage) return;
  
    try {
      const token = await AsyncStorage.getItem('token');
  
      if (!token) {
        console.error('Không tìm thấy token');
        return;
      }

      const newImageUri = selectedImage.startsWith('file://')
      ? selectedImage
      : `file://${selectedImage}`;
  
      const formData = new FormData();
      formData.append('updateUser', JSON.stringify({}));
      formData.append('file', {
        uri: newImageUri,
        name: 'avatar.jpg',
        type: 'image/jpeg',
      });
  
      const response = await api.put(
        '/user/update-bio',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      // console.log('Cập nhật thành công:', response.data);
      Alert.alert('Cập nhật thành công');
      dispatch(getBio());
    } catch (err) {
      Alert.alert('Cập nhật thành công');
    }
  };
    
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trang cá nhân</Text>

      {/* Hiển thị loading */}
      {loading && <ActivityIndicator size="large" color="#6200EE" />}

      {/* Hiển thị lỗi nếu có */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Hiển thị thông tin người dùng nếu có dữ liệu */}
      {bio && (
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
          <Image
            source={{ uri: selectedImage || bio.image }}
            style={styles.avatar}
          />

            <TouchableOpacity style={styles.editIcon} onPress={handleEditAvatar}>
              <Icon name="pencil" size={18} color="#ffffff" />
            </TouchableOpacity>

          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Tên:</Text>
            <Text style={styles.value}>{bio.username}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email:</Text>
            <TouchableOpacity onPress={() => navigation.navigate('UpdateEmailScreen')}>
              <Text style={[styles.value, { color: 'blue', textDecorationLine: 'underline' }]}>
                {bio.email}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Số điện thoại:</Text>
            <Text style={styles.value}>{bio.phone_number}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Ngày sinh:</Text>
            <Text style={styles.value}>{bio.dob}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Điểm:</Text>
            <Text style={styles.value}>{bio.point}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Cấp bậc:</Text>
            <Text style={styles.value}>{bio.level}</Text>
          </View>
        </View>
      )}

      {/* Nút cập nhật thông tin */}
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
        <Text style={styles.updateButtonText}>Cập nhật</Text>
      </TouchableOpacity>


      {/* Nút đăng xuất */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('HomeScreen')}
      >
        <Text style={styles.homeButtonText}>Về trang chủ</Text>
      </TouchableOpacity>

      {/* TabBar */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileContainer: {
    width: '100%',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    alignSelf: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 90,
    alignSelf: 'center',
    marginBottom: 10,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.75,
    borderRadius: 20,
    padding: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  label: {
    flex: 3,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    flex: 7,
    fontSize: 16,
    color: '#555',
    textAlign: 'right',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
  },
  updateButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  homeButton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  homeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },  
});

export default EditProfile;
