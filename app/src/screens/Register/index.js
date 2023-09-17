import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Input, Button, Text } from "@rneui/themed";
import { View, StyleSheet, Image, ScrollView } from "react-native";

const Register = () => {
    const navigation = useNavigation();
    const handleNavLogin = () => {
        navigation.navigate("Login");
    };
    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require("../../../assets/LogoApk.png")}
                />
                <Input
                    containerStyle={{ width: "85%", marginTop: 35 }}
                    style={{ color: "#000000" }}
                    placeholder="NOME"
                />
                <Input
                    containerStyle={{ width: "85%" }}
                    style={{ color: "#000000" }}
                    placeholder="SOBRENOME"
                />
                <Input
                    containerStyle={{ width: "85%" }}
                    style={{ color: "#000000" }}
                    placeholder="EMAIL"
                />
                <Input
                    containerStyle={{ width: "85%" }}
                    style={{ color: "#000000" }}
                    placeholder="SENHA"
                    secureTextEntry={true}
                />
                <Input
                    containerStyle={{ width: "85%" }}
                    style={{ color: "#000000" }}
                    placeholder="CONFIRMAR SENHA"
                    secureTextEntry={true}
                />
                <Button
                    containerStyle={{ width: 180, marginTop: 40 }}
                    buttonStyle={{
                        borderColor: "#FFFFFF",
                    }}
                    titleStyle={{ color: "#000000", fontSize: 20 }}
                    title="REGISTRAR"
                    type="outline"
                />
                <Text
                    onPress={() => {
                        handleNavLogin();
                    }}
                    h4
                    h4Style={{ color: "#000000", marginTop: 40 }}
                >
                    Faça Login
                </Text>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    container: {
        backgroundColor: "#FFFFFF",
        paddingTop: 80,
        paddingBottom: 60,
        alignItems: "center",
    },
    logo: {
        width: 120,
        height: 120,
    },
});
export default Register;
