import React, { useEffect, useState } from 'react';
import { SplashScreen } from './src/screens';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigators/AuthNavigator';
import MainNavigator from './src/navigators/MainNavigator';
import { StatusBar } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import store from './src/lib/redux/store';

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [accessToken, setAccessToken] = useState('');

  const { getItem, setItem } = useAsyncStorage('assetToken');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const token = await getItem();
    if (token) {
      setAccessToken(token);
    }
  };

  return (
    <Provider store={store}>
      <StatusBar barStyle={'dark-content'} translucent backgroundColor={'transparent'} />
      {isShowSplash ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          {accessToken ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      )}
    </Provider>
  );
};

export default App;
