import React, { useState, useEffect } from 'react';
import { Image, Switch, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../../lib/redux/reducers/auth.reducer';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import { appColors } from '../../constants/appColors';
import { Lock, Sms } from 'iconsax-react-native';

const LoginScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    if (!username || !password) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [username, password]);

  // Hàm xử lý đăng nhập
  const handleLogin = async () => {
    try {
      const response = await dispatch(login({ username, password })).unwrap();
      console.log('Đăng nhập thành công:', response);
      Alert.alert('Thành công', 'Đăng nhập thành công');
      navigation.navigate('EditProfile');
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      Alert.alert('Lỗi', 'username hoặc mật khẩu không đúng');
    }
  };

  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 75,
        }}
      >
        <Image
          source={require('../../assets/images/text-logo.png')}
          style={{
            width: 162,
            height: 114,
            marginBottom: 30,
          }}
        />
      </SectionComponent>

      <SectionComponent>
        <TextComponent size={24} title text="Sign in" />
        <SpaceComponent height={21} />

        <InputComponent
          value={username}
          placeholder="username"
          onChange={val => setusername(val)}
          allowClear
          affix={<Sms size={22} color={appColors.gray} />}
        />

        <InputComponent
          value={password}
          placeholder="Password"
          onChange={val => setPassword(val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
        />

        <RowComponent justify="space-between">
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch
              trackColor={{ true: appColors.primary }}
              thumbColor={appColors.white}
              value={isRemember}
              onValueChange={() => setIsRemember(!isRemember)}
            />
            <SpaceComponent width={4} />
            <TextComponent text="Remember me" />
          </RowComponent>

          <ButtonComponent
            text="Forgot Password?"
            onPress={() => navigation.navigate('ForgotPassword')}
            type="text"
          />
        </RowComponent>
      </SectionComponent>

      <SpaceComponent height={16} />

      <SectionComponent>
        <ButtonComponent
          onPress={handleLogin}
          text="SIGN IN"
          type="primary"
        />
      </SectionComponent>

      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Don't have an account?" />
          <ButtonComponent
            type="link"
            text="Sign up"
            onPress={() => navigation.navigate('SignUpScreen')}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
