import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Input, Button, Text } from "@rneui/themed";
import { View, StyleSheet, Image } from "react-native";

const Login = () => {
    const navigation = useNavigation();
    const handleNavRegister = () => {
        navigation.navigate("Register");
    };
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require("../../../assets/LogoApk.png")}
            />
            <Input
                containerStyle={{ width: "85%", marginTop: 40 }}
                style={{
                    color: "#000",
                    borderTopColor: "transparent",
                    borderLeftColor: "transparent",
                    borderRightColor: "transparent",
                    borderWidth: 1,
                    borderBottomColor: "#8CD23C",
                }}
                placeholder="E-MAIL"
                placeholderStyle={{ fontWeight: "bold" }}
                placeholderTextColor="#000"
            />
            <Input
                containerStyle={{ width: "85%", marginTop: 40 }}
                style={{
                    color: "#000",
                    borderTopColor: "transparent",
                    borderLeftColor: "transparent",
                    borderRightColor: "transparent",
                    borderWidth: 1,
                    borderBottomColor: "#8CD23C",
                }}
                placeholder="SENHA"
                secureTextEntry={true}
                placeholderStyle={{ fontWeight: "bold" }}
                placeholderTextColor="#000"
            />
            <Button
                containerStyle={{ width: 220, marginTop: 50, borderRadius: 14 }}
                buttonStyle={{
                    borderColor: "#A8A8A8",
                    backgroundColor: "#00A700",
                }}
                titleStyle={{ color: "#FFFFFF", fontSize: 20 }}
                title="Login"
                type="outline"
            />
            {/* <Text
                onPress={() => {
                    handleNavRegister();
                }}
                h4
                h4Style={{ color: "#000", marginTop: 40, fontWeight: "600" }}
            >
                Faça Registro
            </Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingTop: 90,
        alignItems: "center",
    },
    logo: {
        width: 150,
        height: 150,
    },
});

export default Login;
