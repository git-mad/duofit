import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { auth } from '../../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { StackActions } from '@react-navigation/native'

export const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setPasswordError('')
        auth.updateCurrentUser(userCredential.user)
        console.log('User signed in!')
        console.log(userCredential.user.email)
        console.log(userCredential.user.uid)
      })
      .catch((error) => {
        if (
          ['auth/invalid-email', 'auth/wrong-password', 'auth/user-not-found', 'auth/missing-password'].includes(error.code)
        ) {
          setPasswordError('The credentials you provided are incorrect.')
        } else {
          setPasswordError('An internal error occurred. Please try again.')
        }
        console.error(error)
      })
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          marginTop: '-10%',
          width: '80%'
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            marginTop: '10%'
          }}
        >
          Welcome back!
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: 'grey',
            marginBottom: '7%'
          }}
        >
          Sign in to your account
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '80%'
        }}
      >
        <TextInput
          style={{
            width: '100%',
            backgroundColor: 'lightgrey',
            borderRadius: 5,
            padding: '2%',
            marginBottom: '4%'
          }}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={{
            width: '100%',
            backgroundColor: 'lightgrey',
            borderRadius: 5,
            padding: '2%',
            marginBottom: '5%'
          }}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        />
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end'
          }}
        >
          <TouchableOpacity>
            <Text
              style={{
                color: 'blue'
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.login} onPress={() => login()}>
          <Text style={{ color: 'white', fontSize: 20 }}>Log In</Text>
        </TouchableOpacity>
        <Text
          style={{
            width: '100%',
            textAlign: 'left',
            color: 'red',
            marginTop: '5%'
          }}
        >
          {passwordError}
        </Text>
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
  login: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#3A59FF',
    borderColor: '#3A59FF',
    borderWidth: 1,
    color: 'white',
    borderRadius: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: '2%',
    fontSize: 33,
    marginTop: '5%',
    overflow: 'hidden'
  }
})
