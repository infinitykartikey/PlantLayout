import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import EmployeeDetailsScreen from '../screens/EmployeeDetailsScreen';
import TrainingScreen from '../screens/TrainingScreen';
import ResultScreen from '../screens/ResultScreen';
import InstructionScreen from '../screens/InstructionsScreen';
import AppHeader from "../components/common/AppHeader";
import LanguageScreen from "../screens/LanguageScreen";






const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{
      header: () => <AppHeader />
    }}>
      <Stack.Screen name="Splash" component={SplashScreen} screenOptions={{ headerShown: true }}/>
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="SignUp" component={SignupScreen}/>
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Instructions" component={InstructionScreen}/>
      <Stack.Screen name="Form" component={EmployeeDetailsScreen}/>
      <Stack.Screen name="Test" component={TrainingScreen}/>
      <Stack.Screen name="Result" component={ResultScreen}/>
    </Stack.Navigator>
  );
};

export default AppNavigator;