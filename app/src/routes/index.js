import React, { useRef, useState } from "react";
import {
    View,
    StyleSheet,
    DrawerLayoutAndroid,
    Image,
    TouchableOpacity,
    Text,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBar from "../CustomTabBar";
import Home from "../screens/Home";
import Login from "../screens/Login";

const Tab = createBottomTabNavigator();

const Routes = () => {
    const drawer = useRef(null);
    const [drawerPosition, setDrawerPosition] = useState("left");

    const CustomNavigationView = () => {
        return (
            <View style={styles.menu}>
                <View style={[styles.ImgTitle, { marginBottom: 30 }]}>
                    <Image source={require("../../assets/LogoApk.png")} />
                </View>
                <TouchableOpacity
                    onPress={() => drawer.current.closeDrawer()}
                    style={styles.buttonFlutuant}
                >
                    <Text style={styles.buttonTextClose}>X</Text>
                </TouchableOpacity>
                <View style={styles.profileImg}>
                    <View
                        style={{
                            width: 120,
                            height: 120,
                            backgroundColor: "#4EA8FC",
                            color: "#fff",
                            borderRadius: 200,
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 52,
                                textAlign: "center",
                                color: "#fff",
                            }}
                        >
                            IF
                        </Text>
                    </View>
                    <Text
                        style={{
                            marginTop: 20,
                            fontSize: 18,
                            textAlign: "center",
                        }}
                    >
                        Ihury Ferreira de França
                    </Text>
                </View>
            </View>
        );
    };

    const openDrawer = () => {
        drawer.current.openDrawer();
    };

    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition={drawerPosition}
            renderNavigationView={CustomNavigationView}
            elevation={16}
        >
            <View style={{ flex: 1, position: "relative" }}>
                <Tab.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarHideOnKeyboard: true,
                        tabBarShowLabel: false,
                        tabBarActiveTintColor: "#121212",
                        tabBarStyle: {
                            borderTopWidth: 20,
                            backgroundColor: "#52f6af",
                        },
                    }}
                    tabBar={(props) => <CustomTabBar {...props} />}
                >
                    <Tab.Screen
                        name="Login"
                        options={{
                            tabBarButton: () => null,
                            tabBarStyle: {
                                display: "none",
                            },
                        }}
                    >
                        {() => <Login />}
                    </Tab.Screen>
                    <Tab.Screen
                        name="Home"
                        options={{
                            tabBarIcon: "home",
                        }}
                    >
                        {() => <Home openDrawer={openDrawer} />}
                    </Tab.Screen>
                </Tab.Navigator>
            </View>
        </DrawerLayoutAndroid>
    );
};

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        backgroundColor: "#fff",
        flexDirection: "column-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
    },
    imgTitle: {
        alignItems: "center",
    },
    buttonFlutuant: {
        backgroundColor: "transparent",
        padding: 10,
        borderRadius: 5,
        position: "absolute",
        top: 30,
        right: 5,
    },
    buttonTextClose: {
        color: "rgb(255, 0, 0)",
        fontSize: 28,
    },
    profileImg: {
        marginTop: 40,
        alignItems: "center",
    },
    circle: {
        width: 120,
        height: 120,
        backgroundColor: "#4EA8FC",
        color: "#fff",
        borderRadius: 200,
        justifyContent: "center",
    },
    circleText: {
        fontSize: 52,
        textAlign: "center",
        color: "#fff",
    },
});

export default Routes;
