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
                style={{ color: "#FFFFFF" }}
                placeholder="Login"
            />
            <Input
                containerStyle={{ width: "85%" }}
                style={{ color: "#FFFFFF" }}
                placeholder="Senha"
                secureTextEntry={true}
            />
            <Button
                containerStyle={{ width: 180, marginTop: 40 }}
                buttonStyle={{
                    borderColor: "#FFFFFF",
                }}
                titleStyle={{ color: "#FFFFFF", fontSize: 20 }}
                title="LOGAR"
                type="outline"
            />
            <Text
                onPress={() => {
                    handleNavRegister();
                }}
                h4
                h4Style={{ color: "#FFFFFF", marginTop: 40 }}
            >
                Faça Registro
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        paddingTop: 90,
        alignItems: "center",
    },
    logo: {
        width: 120,
        height: 120,
    },
});

export default Login;
