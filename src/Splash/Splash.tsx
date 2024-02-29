import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native'

export const Splash = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} resizeMode="contain" />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginTop: '70%'
        }}
      >
        <Text style={styles.splashtext}>Start your fitness journey today.</Text>
        <TouchableOpacity
          style={{
            width: '80%'
          }}
          onPress={() => navigation.navigate('register')}
        >
          <Text style={styles.signup}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '80%' }} onPress={() => navigation.navigate('login')}>
          <Text style={styles.login}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: '80%',
    height: '15%'
  },
  splashtext: {
    color: 'black'
  },
  signup: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#3A59FF',
    color: '#3A59FF',
    borderRadius: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: '2%',
    fontSize: 33,
    marginTop: '10%',
    overflow: 'hidden'
  },
  login: {
    backgroundColor: '#3A59FF',
    borderColor: '#3A59FF',
    borderWidth: 1,
    color: 'white',
    borderRadius: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: '2%',
    fontSize: 33,
    marginTop: '10%',
    overflow: 'hidden'
  }
})
