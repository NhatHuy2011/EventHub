import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LoginScreen, OnboardingScreen, EditProfile, VerifyEmailScreen, UpdateEmailScreen } from '../screens';

const AuthNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="VerifyEmailScreen" component={VerifyEmailScreen} />
            <Stack.Screen name="UpdateEmailScreen" component={UpdateEmailScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
