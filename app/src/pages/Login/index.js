// Importa o React e o hook useState para gerenciar o estado.
import React, { useState } from "react";

// Importa componentes específicos do RNEUI (React Native Elements UI) para criar a interface do usuário.
import { Button, Input, Text } from "@rneui/themed";

// Importa componentes específicos do React Native para construir a interface do usuário.
import { View, StyleSheet, Image, Modal } from "react-native";

// Importa o hook useNavigation do React Navigation para navegação entre telas.
import { useNavigation } from "@react-navigation/native";

// Importa a função de login do script login.
import login from "./script/login";

// Definição do componente de Login.
const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    // Função para manipular o login do usuário.
    const handleNavLogin = async () => {
        const { codigo, mensagem } = await login(email, senha);

        if (codigo === "ok") {
            setModalMessage(mensagem);
            setModalVisible(true);
            setTimeout(() => {
                setModalVisible(false);
                navigation.navigate("Home");
            }, 3200);
        } else {
            setModalMessage(`Erro: ${mensagem}`);
            setModalVisible(true);
            setTimeout(() => {
                setModalVisible(false);
            }, 3200);
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
                style={styles.input}
                placeholder="E-MAIL"
                placeholderStyle={styles.placeholder}
                placeholderTextColor="#000"
                value={email}
                onChangeText={(text) => setEmail(text)}
                autoCorrect={false}
            />
            <Input
                containerStyle={{ width: "85%", marginTop: 40 }}
                style={styles.input}
                placeholder="SENHA"
                placeholderStyle={styles.placeholder}
                placeholderTextColor="#000"
                secureTextEntry
                value={senha}
                onChangeText={(text) => setSenha(text)}
                autoCorrect={false}
            />
            <Button
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                onPress={handleNavLogin}
            >
                Login
            </Button>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{modalMessage}</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

// Estilos para o componente de Login.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
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
        padding: 35,
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
    logo: {
        width: 150,
        height: 150,
    },
    input: {
        color: "#000",
        borderTopColor: "transparent",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderWidth: 1,
        borderBottomColor: "#8CD23C",
    },
    placeholder: {
        fontWeight: "bold",
    },
    buttonContainer: {
        width: 220,
        marginTop: 50,
        borderRadius: 14,
    },
    button: {
        backgroundColor: "#00A700",
    },
    modalText: {
        textAlign: "center",
        fontSize: 16,
    },
});

// Exporta o componente de Login para uso em outros arquivos.
export default Login;
