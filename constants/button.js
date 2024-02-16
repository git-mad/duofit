import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Button = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={props.onPress}>
                <Text style={styles.text}> {props.text} </Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        width: "80%",
    },
    button: {
        height: "25%",
        borderRadius: 15,
        backgroundColor: "#019E90",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#fff",
    }
});
