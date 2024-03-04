import { View, Text, Button, TouchableOpacity, StyleSheet, Image} from "react-native";
import { scaleSize } from "./util";
import { DocumentData } from "firebase/firestore";
import { MaterialIcons } from '@expo/vector-icons';

interface ProfileButtonProps{
    user: DocumentData
    profilePicture?: string
    onClick: () => void
}
export const ProfileButton: React.FC<ProfileButtonProps> = ({user, profilePicture, onClick}) => {
    const imgSrc = profilePicture ? {uri: profilePicture} : require('./assets/defaultprofile.png')
    return (
        <TouchableOpacity style={styles.ProfileButtonStyle} onPress={() => onClick()}>
            <Image 
                source={imgSrc} 
                style={styles.ProfilePicture}
                resizeMode="contain" 
            />
            <View style={
                {
                    flexDirection: 'column',
                    justifyContent: 'center',
                }
            }>
            <Text style={{marginLeft: 16}}>
                <Text style={user.days.includes("Su") ? styles.ProfileDOWActive : styles.ProfileDOWInactive}>Su </Text>
                <Text style={user.days.includes("M") ? styles.ProfileDOWActive : styles.ProfileDOWInactive}>M </Text>
                <Text style={user.days.includes("T") ? styles.ProfileDOWActive : styles.ProfileDOWInactive}>T </Text>
                <Text style={user.days.includes("W") ? styles.ProfileDOWActive : styles.ProfileDOWInactive}>W </Text>
                <Text style={user.days.includes("Th") ? styles.ProfileDOWActive : styles.ProfileDOWInactive}>Th </Text>
                <Text style={user.days.includes("F") ? styles.ProfileDOWActive : styles.ProfileDOWInactive}>F </Text>
                <Text style={user.days.includes("Sa") ? styles.ProfileDOWActive : styles.ProfileDOWInactive}>Sa </Text>
            </Text>
            <Text style={styles.ProfileNameTextStyle}>{user.name != "" ? user.name : "undefined"}</Text>
            <View style={{
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
            }}>
                <MaterialIcons name="location-pin" size={scaleSize(16)} color="black" key={"location-pin"} style={{marginLeft: scaleSize(16)}}/>
                <Text style={styles.ProfileInterestsTextStyle}>{user.location? user.location : "undefined"}</Text>
            </View>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    ProfileButtonStyle: {
        width: '95%',
        height: scaleSize(128),
        backgroundColor: 'white',
        color: 'white',
        borderRadius: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        padding: '2%',
        fontSize: scaleSize(33),
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: scaleSize(0),
            height: scaleSize(4),
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        flexDirection: 'row',
        
        elevation: 8,
    },
    ProfilePicture: {
        marginLeft: 8,
        marginTop: 8,
        width: scaleSize(96),
        height: scaleSize(96),
        borderRadius: 50,
    },
    ProfileNameTextStyle: {
        fontSize: scaleSize(24),
        fontWeight: 'bold',
        marginLeft: 16,
    },
    ProfileDOWActive: {
        fontSize: scaleSize(16),
        color: 'black',
        marginLeft: 16,
    },
    ProfileDOWInactive: {
        fontSize: scaleSize(16),
        color: 'lightgrey',
        marginLeft: 16,
    },
    ProfileInterestsTextStyle: {
        fontSize: scaleSize(16),
        color: 'black',
    },
})