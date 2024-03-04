import { View, Text, Button, TouchableOpacity, StyleSheet, Image, FlatList, RefreshControl} from "react-native";
import { ProfileButton } from "../components/ProfileButton";
import {auth, db} from '../../../firebaseConfig'
import { doc, getDoc, setDoc, DocumentData, collection, getDocs} from "firebase/firestore";

import { useCallback, useEffect, useState } from "react";

export function HomeScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', height: '100%', width: '100%' }}>
        <ProfilesList/>
      </View>
    )
  }

  const ProfilesList = () => {
    const [users, setUsers] = useState<DocumentData[]>([]);
    const [refreshing, setRefreshing] = useState(false);
  
    const fetchUsers = async () => {
      const currentUser = auth.currentUser;
      const querySnapshot = await getDocs(collection(db, "users"));
      const fetchedUsers: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        if (doc.id !== currentUser?.uid) { // Ensure strict comparison for safety
          fetchedUsers.push(doc.data());
        }
      });
      setUsers(fetchedUsers);
    };
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const onRefresh = useCallback(async () => {
      setRefreshing(true);
      await fetchUsers(); // Re-fetch the users
      setRefreshing(false);
    }, []);
  
    return (
      <View style={{ height: "100%", width: "100%", marginLeft: 20 }}>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <ProfileButton
              name={item.name}
              interests={item.interests}
              days={item.days}
            />
          )}
          keyExtractor={(item, index) => index.toString()} // Add a key extractor for list items
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </View>
    );
  };


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
})