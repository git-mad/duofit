import { View, Text, Image } from 'react-native'
import 'firebase/database'
import { DocumentData } from 'firebase/firestore'

export function ProfileView(user: DocumentData) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={{ uri: user.photoURL }}
        style={{ width: 100, height: 100, borderRadius: 100 }}
      />
      <Text>{user.name}</Text>
      <Text>{user.location}</Text>
      <Text>{user.interests}</Text>
      <Text>{user.days}</Text>
      <Text>{user.bio}</Text>
    </View>
  )
}
