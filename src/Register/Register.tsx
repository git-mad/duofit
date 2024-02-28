import auth from '@react-native-firebase/auth'
import React, { useState } from 'react'
import { Button, TextInput, View } from 'react-native'

export const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const register = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!')
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!')
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!')
        }

        console.error(error)
      })
  }

  return (
    <View>
      <TextInput
        placeholder="email"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        autoCapitalize="none"
        secureTextEntry={true}
        placeholder="password"
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Register" onPress={register} />
    </View>
  )
}
