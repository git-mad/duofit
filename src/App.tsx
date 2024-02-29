import { StyleSheet, SafeAreaView } from 'react-native'

import { Register } from './Register/Register'
import { Splash } from './Splash/Splash'
import { Login } from './Login/Login'
import { Landing } from './Main/Landing'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { auth } from '../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { StackActions } from '@react-navigation/native'
import { useEffect, useState } from 'react'

const Stack = createNativeStackNavigator()

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(Boolean)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
  
    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);
  
  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          {!isSignedIn ? (
            <>
              <Stack.Screen name="splash" component={SplashScreen} options={{ headerShown: false }} />
              <Stack.Screen name="register" component={RegisterScreen} options={{ headerShown: false }} />
              <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
            </> 
            ) : (
              <>
              <Stack.Screen name="landing" component={LandingScreen} options={{ headerShown: false }} />
              </>
            )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

const SplashScreen = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Splash navigation={navigation} />
    </SafeAreaView>
  )
}

const RegisterScreen = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Register />
    </SafeAreaView>
  )
}

const LoginScreen = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Login navigation={navigation}/>
    </SafeAreaView>
  )
}

const LandingScreen = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Landing />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})
