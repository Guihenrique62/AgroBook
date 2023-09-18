import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { View, StyleSheet, ScrollView, TextInput } from "react-native";

const Home = () => {
    const navigation = useNavigation();
    const handleNavLogin = () => {
        navigation.navigate("Login");
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon
                        name="menu"
                        type="material"
                        color="#000000"
                        onPress={() => {
                            // Lógica para abrir o menu
                        }}
                    />
                    <View style={styles.inputContainer}>
                        <TextInput
                            type="text"
                            placeholder=""
                            style={styles.input}
                        />
                        <Icon
                            name="search"
                            size={25}
                            color="#000"
                            style={styles.icon}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    container: {
        backgroundColor: "#52f6af",
        paddingTop: 0,
        paddingBottom: 0,
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 35,
        paddingHorizontal: 20,
        width: "100%",
        marginBottom: 10,
    },
    menuItem: {
        marginBottom: 0,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: 14,
        paddingHorizontal: 0,
        marginBottom: 0,
        width: 180,
    },
    input: {
        backgroundColor: "#fff",
        paddingTop: 2,
        paddingLeft: 10,
        paddingBottom: 2,
        width: "70%",
        borderRadius: 14,
        borderWidth: 0,
        position: "relative",
        left: 0,
    },
    icon: {
        paddingHorizontal: 25,
    },
});

export default Home;
