import React, { useEffect } from 'react';
import { Text, BackHandler } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatList from './screens/ChatList';
import Chat from './screens/Chat';
import Settings from './screens/Settings';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-native-paper';

import firebase from "firebase/app";


import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDUMSFlV9rT1V6E6w-4xCHlwwD1MJ5Jflc",

  authDomain: "chat-app-24048.firebaseapp.com",

  projectId: "chat-app-24048",

  storageBucket: "chat-app-24048.appspot.com",

  messagingSenderId: "126316664314",

  appId: "1:126316664314:web:67f19b1ce516310f2f8043"

};
firebase.initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

const Tabs = createBottomTabNavigator();
const TabsNavigator = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const isLoggedIn = false;
    if (!isLoggedIn) {
      navigation.navigate('SignUp');
    }
  }, [])
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {

          return <Ionicons name={route.name === "ChatList" ? "chatbubbles" : "settings"} color={color} size={size} />
        }
      })}
    >
      <Tabs.Screen name="ChatList" component={ChatList} />
      <Tabs.Screen name="Settings" component={Settings} />
    </Tabs.Navigator>
  )
}


const App = () => {
  useEffect(()=>{
    BackHandler.addEventListener('hardwareBackPress', function () { return true })
  },[])
  return (
    <NavigationContainer>
      <Provider>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={TabsNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="SignIn" component={SignIn} options={{ presentation: 'fullScreenModal' }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ presentation: 'fullScreenModal', headerBackVisible:false}} 
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}

export default App;