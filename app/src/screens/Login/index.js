import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Input, Button, Text } from "@rneui/themed";
import { View, StyleSheet, Image, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
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
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const senhaRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,8}$/;

        if (!email || !senha) {
            setModalMessage("Por favor, preencha todos os campos");
            setModalVisible(true);
            return;
        } else if (!emailRegex.test(email)) {
            setModalMessage("Por favor, insira um endereço de email válido");
            setModalVisible(true);
            return;
        } else if (!senhaRegex.test(senha)) {
            setModalMessage(
                "A senha deve conter pelo menos um número, uma letra minúscula, uma letra maiúscula e ter de 6 a 8 caracteres"
            );
            setModalVisible(true);
            return;
        } else {
            if (email === "ihuryferreira@icloud.com" && senha === "Ihu@2356") {
                setModalMessage("Login Validado Com Sucesso.");
                await AsyncStorage.setItem("token", "6506951bd5581");
                navigation.navigate("Home");
            } else {
                if (
                    email !== "ihuryferreira@icloud.com" ||
                    senha !== "Ihu@2356"
                ) {
                    setModalMessage(
                        "Email ou senha incorretos. Por favor, tente novamente."
                    );
                    setModalVisible(true);
                }
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
                autoCorrect={false} // Removendo auto Corretor de Texto
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
                autoCorrect={false} // Removendo auto Corretor de Texto
            />
            <Button
                containerStyle={{ width: 220, marginTop: 50, borderRadius: 14 }}
                buttonStyle={{ backgroundColor: "#00A700" }}
                onPress={handleNavRegister}
            >
                Login
            </Button>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ textAlign: "center", fontSize: 16 }}>
                            {modalMessage}
                        </Text>
                        <Button
                            buttonStyle={{
                                backgroundColor: "#00A700",
                                marginVertical: 15,
                            }}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            Fechar
                        </Button>
                    </View>
                </View>
            </Modal>
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default Login;
