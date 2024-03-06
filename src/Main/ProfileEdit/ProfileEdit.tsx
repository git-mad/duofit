import React, { Component, useEffect, useState } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
  ActionSheetIOS,
  Platform
} from 'react-native'

import { db, auth } from 'firebaseConfig'

import 'firebase/database'
import { doc, getDoc, setDoc, DocumentData } from 'firebase/firestore'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

import { scaleSize } from '../components/util'

import { Picker } from '@react-native-picker/picker'

const allInterests: { [key: string]: string } = {
  Weightlifting: '🏋️',
  Bodybuilding: '💪',
  'Cardio/Running': '🏃',
  Calisthenics: '🤸',
  Swimming: '🏊',
  Sports: '🏈'
}

function checkIfIOS() {
  return Platform.OS === 'ios'
}

export function ProfileEdit(this: any) {
  const [interests, setInterests] = useState<string[]>([])
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [days, setDays] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState('')

  const appendInterests = (interest: string) => {
    let newInterests = interests.includes(interest)
      ? interests.filter((item) => item !== interest)
      : [...interests, interest]
    setInterests(newInterests)
    onSettingChange(newInterests, days, bio, location) // Pass the updated interests
  }

  const removeInterest = (interest: string) => {
    let newInterests = interests.filter((item) => item !== interest)
    setInterests(newInterests)
    onSettingChange(newInterests, days, bio, location) // Pass the updated interests
  }

  const appendDays = (day: string) => {
    let newDays = days.includes(day) ? days.filter((item) => item !== day) : [...days, day]
    setDays(newDays)
    onSettingChange(interests, newDays, bio, location) // Pass the updated days
  }

  const removeDay = (day: string) => {
    let newDays = days.filter((item) => item !== day)
    setDays(newDays)
    onSettingChange(interests, newDays, bio, location) // Pass the updated days
  }
  const changeBio = (newBio: string) => {
    setBio(newBio)
    onSettingChange(interests, days, newBio, location) // Pass the updated bio
  }

  const changeLocation = (newLocation: string) => {
    setLocation(newLocation)
    onSettingChange(interests, days, bio, newLocation) // Pass the updated location
  }

  const onInterestButtonClick = (interest: string) => {
    if (interests.includes(interest)) {
      removeInterest(interest)
    } else {
      appendInterests(interest)
    }
  }

  const onDayButtonClick = (day: string) => {
    if (days.includes(day)) {
      removeDay(day)
    } else {
      appendDays(day)
    }
  }
  const onSettingChange = (
    currentInterests: string[],
    currentDays: string[],
    currentBio: string,
    currentLocation: string
  ) => {
    const docRef = doc(db, 'users', auth.currentUser!.uid)
    const data = {
      name: name,
      interests: currentInterests,
      days: currentDays,
      bio: currentBio ? currentBio : '',
      location: currentLocation ? currentLocation : ''
    }
    setDoc(docRef, data)
  }

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, 'users', auth.currentUser!.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data() as DocumentData
        setInterests(data.interests)
        setName(data.name)
        setDays(data.days)
        setBio(data.bio)
        setLocation(data.location)
      } else {
        // handle the case where the document does not exist
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        <Text>Loading your profile</Text>
      </View>
    )
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10%'
          }}
        >
          <Image
            source={require('../components/assets/defaultprofile.png')}
            style={{
              width: scaleSize(128),
              height: scaleSize(128),
              borderRadius: 100
            }}
          />
          <Text
            style={{
              fontSize: scaleSize(24),
              fontWeight: 'bold'
            }}
          >
            {name}
          </Text>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center'
              }}
            >
              <MaterialCommunityIcons name="pencil" color="blue" size={12} />
              <Text
                style={{
                  fontSize: scaleSize(12),
                  color: 'blue'
                }}
              >
                Change Display Name
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '85%',
            marginTop: '10%'
          }}
        >
          <View
            style={{
              justifyContent: 'flex-start',
              alignContent: 'flex-start',
              alignItems: 'flex-start'
            }}
          >
            <Text
              style={{
                fontSize: scaleSize(18),
                textAlign: 'left',
                fontWeight: 'bold',
                marginTop: scaleSize(8)
              }}
            >
              Your Bio
            </Text>
            <Text style={{ fontSize: scaleSize(12), textAlign: 'left' }}>
              Tell the world about yourself!
            </Text>
            <TextInput
              style={{
                width: '100%',
                height: scaleSize(128),
                backgroundColor: 'white',
                borderColor: 'gainsboro',
                borderWidth: 1,
                borderRadius: 10,
                padding: '2%',
                marginBottom: scaleSize(16),
                marginTop: scaleSize(8),
                fontSize: scaleSize(14)
              }}
              multiline={true}
              placeholder="Hello my name is..."
              autoCapitalize="none"
              onChangeText={(text) => changeBio(text)}
              value={bio}
            />
          </View>
          <View
            style={{
              justifyContent: 'flex-start',
              alignContent: 'flex-start',
              alignItems: 'flex-start'
            }}
          >
            <Text
              style={{
                fontSize: scaleSize(18),
                textAlign: 'left',
                fontWeight: 'bold',
                marginTop: scaleSize(8)
              }}
            >
              Your Interests
            </Text>
            <Text style={{ fontSize: scaleSize(12), textAlign: 'left' }}>
              Select your favorite activities
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: scaleSize(8)
            }}
          >
            <InterestButton
              icon="🏋️"
              interest="Weightlifting"
              checked={interests.includes('Weightlifting')}
              onClick={onInterestButtonClick}
            />
            <InterestButton
              icon="💪"
              interest="Bodybuilding"
              checked={interests.includes('Bodybuilding')}
              onClick={onInterestButtonClick}
            />
            <InterestButton
              icon="🏃"
              interest="Cardio/Running"
              checked={interests.includes('Cardio/Running')}
              onClick={onInterestButtonClick}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: scaleSize(8),
              marginBottom: scaleSize(16)
            }}
          >
            <InterestButton
              icon="🤸"
              interest="Calisthenics"
              checked={interests.includes('Calisthenics')}
              onClick={onInterestButtonClick}
            />
            <InterestButton
              icon="🏊"
              interest="Swimming"
              checked={interests.includes('Swimming')}
              onClick={onInterestButtonClick}
            />
            <InterestButton
              icon="🏈"
              interest="Sports"
              checked={interests.includes('Sports')}
              onClick={onInterestButtonClick}
            />
          </View>
          <View
            style={{
              justifyContent: 'flex-start',
              alignContent: 'flex-start',
              alignItems: 'flex-start'
            }}
          >
            <Text
              style={{
                fontSize: scaleSize(18),
                textAlign: 'left',
                fontWeight: 'bold',
                marginTop: scaleSize(8)
              }}
            >
              Your Schedule
            </Text>
            <Text style={{ fontSize: scaleSize(12), textAlign: 'left' }}>
              Select your activity schedule
            </Text>
          </View>
          <DayOfWeekList dayList={days} onClick={onDayButtonClick} />
          <View
            style={{
              justifyContent: 'flex-start',
              alignContent: 'flex-start',
              alignItems: 'flex-start'
            }}
          >
            <Text
              style={{
                fontSize: scaleSize(18),
                textAlign: 'left',
                fontWeight: 'bold',
                marginTop: scaleSize(8)
              }}
            >
              Your Location
            </Text>
            <Text style={{ fontSize: scaleSize(12), textAlign: 'left' }}>
              Select your main location
            </Text>
          </View>
          <LocationPicker onChange={changeLocation} currentLocation={location} />
          <TouchableOpacity
            style={{ width: '100%' }}
            onPress={() => {
              Alert.alert('Log Out', 'Are you sure you want to log out?', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel'
                },
                {
                  text: 'OK',
                  onPress: () => {
                    auth
                      .signOut()
                      .then(() => {
                        console.log('Logged out')
                      })
                      .catch((error) => {
                        console.log(error)
                      })
                  }
                }
              ])
            }}
          >
            <Text
              style={{
                backgroundColor: '#ff3838',
                borderColor: '#ff3838',
                borderWidth: 1,
                color: 'white',
                borderRadius: 5,
                textAlign: 'center',
                fontWeight: 'bold',
                padding: '2%',
                fontSize: scaleSize(24),
                marginTop: '10%',
                marginBottom: '10%',
                overflow: 'hidden',
                width: '100%'
              }}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

interface InterestButtonProps {
  icon: string
  interest: string
  checked?: boolean
  onClick: (interest: string) => void
}

interface LocationPickerProps {
  onChange: (location: string) => void
  currentLocation?: string
}

const LocationPicker = Platform.select({
  ios: ({ onChange, currentLocation }: LocationPickerProps) => {
    return (
      <TouchableOpacity
        style={{
          width: '100%',
          height: scaleSize(48),
          backgroundColor: 'white',
          borderColor: 'gainsboro',
          borderWidth: 1,
          borderRadius: 10,
          padding: '2%',
          marginBottom: scaleSize(16),
          marginTop: scaleSize(8),
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => {
          ActionSheetIOS.showActionSheetWithOptions(
            {
              options: [
                'Cancel',
                'Georgia Tech CRC',
                'GT Connector',
                'North Avenue Gym',
                'LA Fitness',
                'Other'
              ],
              cancelButtonIndex: 0
            },
            (buttonIndex) => {
              if (buttonIndex === 0) {
                console.log('Cancel Pressed')
              } else if (buttonIndex === 1) {
                onChange('Georgia Tech CRC')
              } else if (buttonIndex === 2) {
                onChange('GT Connector')
              } else if (buttonIndex === 3) {
                onChange('North Avenue Gym')
              } else if (buttonIndex === 4) {
                onChange('LA Fitness')
              } else if (buttonIndex === 5) {
                onChange('Other')
              }
            }
          )
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center', // Adjust this to change vertical alignment
            minWidth: '100%'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
              marginLeft: 8,
              marginRight: 8
            }}
          >
            <MaterialIcons
              name="location-pin"
              size={scaleSize(16)}
              color="black"
              key={'location-pin'}
            />
            <Text style={{ fontSize: scaleSize(14) }}>
              {!currentLocation ? 'Select your main location' : currentLocation}
            </Text>
          </View>
          <MaterialIcons
            name="arrow-drop-down"
            size={scaleSize(16)}
            color="black"
            key={'arrow-drop-down'}
          />
        </View>
      </TouchableOpacity>
    )
  },
  default: ({ onChange, currentLocation }: LocationPickerProps) => {
    return (
      <Picker
        selectedValue={currentLocation ? currentLocation : 'Select your main location'}
        style={{
          width: '100%',
          height: scaleSize(48),
          backgroundColor: 'white',
          borderColor: 'gainsboro',
          borderWidth: 1,
          borderRadius: 10,
          padding: '2%',
          marginBottom: scaleSize(16),
          marginTop: scaleSize(8)
        }}
        id="locationPicker"
        onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
      >
        <Picker.Item label="Georgia Tech CRC" value="Georgia Tech CRC" />
        <Picker.Item label="GT Connector" value="GT Connector" />
        <Picker.Item label="North Avenue Gym" value="North Avenue Gym" />
        <Picker.Item label="LA Fitness" value="LA Fitness" />
        <Picker.Item label="Other" value="Other" />
      </Picker>
    )
  }
})

const InterestButton: React.FC<InterestButtonProps> = ({ icon, interest, checked, onClick }) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <TouchableOpacity
        style={{
          width: scaleSize(96),
          height: scaleSize(96),
          backgroundColor: checked ? '#3A59FF' : 'gainsboro',
          borderRadius: 10,
          marginRight: 8,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => onClick(interest as string)}
      >
        <Text style={{ fontSize: scaleSize(40), paddingBottom: 8 }}>{icon}</Text>
        <Text style={{ fontSize: scaleSize(12), color: checked ? 'white' : 'black' }}>
          {interest}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const DayOfWeekList: React.FC<{ dayList: string[]; onClick: (day: string) => void }> = ({
  dayList,
  onClick
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: scaleSize(8),
        marginBottom: scaleSize(16)
      }}
    >
      <DayOfWeekButton day="Su" checked={dayList.includes('Su')} onClick={onClick} />
      <DayOfWeekButton day="M" checked={dayList.includes('M')} onClick={onClick} />
      <DayOfWeekButton day="T" checked={dayList.includes('T')} onClick={onClick} />
      <DayOfWeekButton day="W" checked={dayList.includes('W')} onClick={onClick} />
      <DayOfWeekButton day="Th" checked={dayList.includes('Th')} onClick={onClick} />
      <DayOfWeekButton day="F" checked={dayList.includes('F')} onClick={onClick} />
      <DayOfWeekButton day="Sa" checked={dayList.includes('Sa')} onClick={onClick} />
    </View>
  )
}

const DayOfWeekButton: React.FC<{
  day: string
  checked?: boolean
  onClick: (day: string) => void
}> = ({ day, checked, onClick }) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <TouchableOpacity
        style={{
          width: scaleSize(32),
          height: scaleSize(32),
          backgroundColor: checked ? '#3A59FF' : 'white',
          borderColor: '#3A59FF',
          borderWidth: scaleSize(1),
          borderRadius: 50,
          marginRight: 8,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => onClick(day)}
      >
        <Text style={{ fontSize: scaleSize(12), color: checked ? 'white' : 'black' }}>{day}</Text>
      </TouchableOpacity>
    </View>
  )
}
