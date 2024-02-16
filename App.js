import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from './constants/button';

function Home() {
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <Text>Let's get started!</Text>
      <Button text="Continue" />
      <StatusBar style="auto" />
    </View>
  )
}

//navigation between diff screens
const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShadowVisible: false,
                    headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
