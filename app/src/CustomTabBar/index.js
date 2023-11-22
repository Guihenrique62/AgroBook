import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function CustomTabBar({ state, descriptors, navigation }) {
    const isAuthenticated = true; // Substitua por sua lógica de autenticação

    if (state.routeNames[state.index] !== "Home" || !isAuthenticated) {
        return null; // Não renderizar a TabBar em outras telas ou se o usuário não estiver autenticado
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate({
                                name: route.name,
                                merge: true,
                            });
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: "tabLongPress",
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={
                                isFocused ? { selected: true } : {}
                            }
                            accessibilityLabel={
                                options.tabBarAccessibilityLabel
                            }
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.tabButton}
                            key={route.key}
                        >
                            <MaterialIcons
                                name={options.tabBarIcon}
                                size={45}
                                color={isFocused ? "#000" : "#888"}
                            />
                            <Text
                                style={[
                                    styles.tabLabel,
                                    { color: isFocused ? "#000" : "#888" },
                                ]}
                            >
                                {options.title}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 60,
        backgroundColor: "#fff",
        elevation: 2,
    },
    content: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 155,
        backgroundColor: "#52f6af",
    },
    tabButton: {
        marginTop: 18,
    },
    tabLabel: {
        fontSize: 12,
        marginTop: 4,
    },
});
