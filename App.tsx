import { View, Text, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IntroduceScreen } from './src/screens';
import AuthNavigator from './src/navigators/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  const [isShowIntroduce, setIsShowIntroduce] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowIntroduce(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
    <StatusBar barStyle={"dark-content"} backgroundColor={"transparent"} translucent/>
      {
        isShowIntroduce ? (<IntroduceScreen />) : 
        (
          <NavigationContainer>
            <AuthNavigator />
          </NavigationContainer>
        )
      }
    </>
  );
}

export default App