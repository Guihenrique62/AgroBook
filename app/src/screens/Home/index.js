import React from "react";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { View, StyleSheet, ScrollView, TextInput } from "react-native";
import { Icon } from "@rneui/themed";

const Home = ({ openDrawer }) => {
    const navigation = useNavigation();

    const handleOpenDrawer = () => {
        openDrawer();
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.navBar}>
                    <Icon
                        name="menu"
                        type="material"
                        color="#000000"
                        onPress={handleOpenDrawer}
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
    navBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 35,
        paddingHorizontal: 20,
        width: "100%",
        marginBottom: 10,
    },
    menu: {
        flex: 1,
        flexDirection: "column-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
    },
    navigationContainer: {
        backgroundColor: "#ecf0f1",
    },
    perfilImg: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
    },
    buttonFlutuant: {
        backgroundColor: "transparent",
        padding: 10,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 999,
    },
    buttonTextClose: {
        marginVertical: 10,
        color: "red",
        fontSize: 32,
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
