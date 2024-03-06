import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

import { DuoScreen } from './Duo/Duo'
import { HomeScreen } from './Home/Home'
import { MessagesScreen } from './Messages/Messages'
import { scaleSize } from './components/util'

const Tab = createBottomTabNavigator()
var _navigation: any

export const Landing = ({ navigation }: any) => {
  _navigation = useNavigation()
  return (
    <NavigationContainer independent={true}>
      <Tabs />
    </NavigationContainer>
  )
}

function Tabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ _navigation }}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={scaleSize(size)} />
          ),
          headerLeft(props) {
            return lHeader
          },
          headerRight(props) {
            return rHeader
          }
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={scaleSize(size)} />
          ),
          headerLeft(props) {
            return lHeader
          },
          headerRight(props) {
            return rHeader
          }
        }}
      />
      <Tab.Screen
        name="Duo"
        component={DuoScreen}
        options={{
          tabBarLabel: 'Duo',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="infinity" color={color} size={scaleSize(size)} />
          ),
          headerLeft(props) {
            return lHeader
          },
          headerRight(props) {
            return rHeader
          }
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export const lHeader = [
  <TouchableOpacity>
    <MaterialIcons
      name="menu"
      size={scaleSize(28)}
      color="black"
      key={'menu'}
      style={{
        paddingLeft: 20
      }}
    />
  </TouchableOpacity>
]

export const rHeader = [
  <TouchableOpacity onPress={() => _navigation!.navigate('profile')}>
    <MaterialIcons
      name="account-circle"
      size={scaleSize(28)}
      color="black"
      key={'menu'}
      style={{
        paddingRight: 20
      }}
    />
  </TouchableOpacity>
]
