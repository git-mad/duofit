import { StyleSheet, View, SafeAreaView } from 'react-native'

import { Register } from './Register/Register'
import { Splash } from './Splash/Splash'
import { Login } from './Login/Login'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="splash">
          <Stack.Screen name="splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
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
      <Login />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})
