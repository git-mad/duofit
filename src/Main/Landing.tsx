import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Image, Button } from 'react-native'
import { auth } from '../../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { StackActions } from '@react-navigation/native'

export const Landing = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Text>Hello! Your email is {auth.currentUser?.email}</Text>
            <Button title="Log Out" onPress={() => auth.signOut()} />
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
})
