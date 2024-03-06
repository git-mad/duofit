import { useNavigation } from '@react-navigation/native'
import { DocumentData, collection, getDocs } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native'

import { auth, db } from '../../../firebaseConfig'
import { ProfileButton } from '../components/ProfileButton'

var _navigation: any
export function HomeScreen(navigation: any) {
  _navigation = useNavigation()
  return (
    <View style={{ flex: 1, alignItems: 'center', height: '100%', width: '100%' }}>
      <ProfilesList />
    </View>
  )
}

const ProfilesList = () => {
  const [users, setUsers] = useState<DocumentData[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [showBottomSheet, setShowBottomSheet] = useState(false)

  const fetchUsers = async () => {
    const currentUser = auth.currentUser
    const querySnapshot = await getDocs(collection(db, 'users'))
    const fetchedUsers: DocumentData[] = []
    querySnapshot.forEach((doc) => {
      if (doc.id !== currentUser?.uid) {
        // Ensure strict comparison for safety
        fetchedUsers.push(doc.data())
      }
    })
    setUsers(fetchedUsers)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await fetchUsers() // Re-fetch the users
    setRefreshing(false)
  }, [])

  return (
    <View style={{ height: '100%', width: '100%', justifyContent: 'center' }}>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <ProfileButton
            user={item}
            onClick={() => {
              _navigation.navigate('profileview')
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()} // Add a key extractor for list items
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={{ width: '100%', height: '100%' }}
        contentContainerStyle={{ paddingStart: '5%', width: '100%', height: '100%' }}
      />
    </View>
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
