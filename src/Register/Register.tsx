import { createUserWithEmailAndPassword } from 'firebase/auth'

import React, { useState } from 'react'

import { Button, TextInput, View } from 'react-native'

import { auth } from '../../firebaseConfig'

export const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User account created & signed in!')
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!')
        } else if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!')
        } else {
          console.error(error)
        }
      })
  }

  return (
    <View>
      <TextInput
        placeholder="email goes here"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        autoCapitalize="none"
        secureTextEntry={true}
        placeholder="password is here!"
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Register" onPress={register} />
    </View>
  )
}
