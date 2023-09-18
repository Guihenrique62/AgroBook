import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Input, Button, Text } from "@rneui/themed";
import { View, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        checkAuthentication();
    }, []);

    const checkAuthentication = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            navigation.navigate("Home");
        }
    };

    const handleNavRegister = async () => {
        if (!email || !senha) {
            console.log("Por favor, preencha todos os campos");
            return;
        } else {
            if (email === "ihury" && senha === "123") {
                console.log("Login Validado Com Sucesso.");

                // Armazene as informações de autenticação
                await AsyncStorage.setItem("token", "6506951bd5581");

                navigation.navigate("Home");
            } else {
                console.log(
                    "Email ou senha incorretos. Por favor, tente novamente."
                );
            }
        }
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
                value={email}
                onChangeText={(text) => setEmail(text)}
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
                placeholderStyle={{ fontWeight: "bold" }}
                placeholderTextColor="#000"
                secureTextEntry
                value={senha}
                onChangeText={(text) => setSenha(text)}
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
                onPress={handleNavRegister}
            />
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
