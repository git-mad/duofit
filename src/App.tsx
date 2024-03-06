import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Login } from './Login/Login'
import { ProfileEdit } from './Main//ProfileEdit/ProfileEdit'
import { ProfileView } from './Main/Home/ProfileView'
import { Landing } from './Main/Landing'
import { Register } from './Register/Register'
import { Splash } from './Splash/Splash'
import { auth } from '../firebaseConfig'

const Stack = createNativeStackNavigator()

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(Boolean)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsSignedIn(!!user)
    })

    // Cleanup subscription on component unmount
    return () => unsubscribe()
  }, [])

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            {!isSignedIn ? (
              <>
                <Stack.Screen
                  name="splash"
                  component={SplashScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="register"
                  component={RegisterScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="login"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="landing"
                  component={LandingScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="profile"
                  component={ProfileEditScreen}
                  options={{
                    headerShown: true,
                    headerTitle: 'My Profile',
                    headerBackTitle: 'Back'
                  }}
                />
                <Stack.Screen
                  name="profileview"
                  component={ProfileViewScreen}
                  options={{ headerShown: true, headerBackTitle: 'Back' }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
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
      <Login navigation={navigation} />
    </SafeAreaView>
  )
}

const LandingScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Landing navigation={navigation} />
    </View>
  )
}

const ProfileEditScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <ProfileEdit />
    </View>
  )
}

const ProfileViewScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <ProfileView navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})
