// Importa o React e outros componentes necessários para o funcionamento do código.
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";
import {
    DrawerLayoutAndroid,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// Importa as telas Home e DetalhesFilme.
import Home from "../../pages/Home";
import DetalhesFilme from "../../pages/DetalhesFilme";

// Importa os componentes Header e HeaderItem.
import Header from "../../components/Header";
import HeaderItem from "../../components/HeaderItem";

// Cria um navegador de tabulação inferior.
const Tab = createBottomTabNavigator();

// Componente TabBar que renderiza a barra de navegação inferior com um menu lateral.
const TabBar = () => {
    const drawer = React.createRef();
    const drawerState = { isOpen: false };

    const toggleDrawer = () => {
        if (drawerState.isOpen) {
            drawer.current.closeDrawer();
            drawerState.isOpen = false;
        } else {
            drawer.current.openDrawer();
            drawerState.isOpen = true;
        }
    };

    // Menu toggle, falta aplicar botões e buscar o nome e siglas do Nome ou modificar para ser imagens do perfil do usuário.
    const Menu = ({ toggleDrawer }) => {
        return (
            <View style={styles.menu}>
                <View style={[styles.ImgTitle, { marginBottom: 30 }]}>
                    <Image source={require("../../../assets/LogoApk.png")} />
                </View>
                <TouchableOpacity
                    onPress={() => toggleDrawer()}
                    style={styles.buttonFlutuant}
                >
                    <Text style={styles.buttonTextClose}>X</Text>
                </TouchableOpacity>
                <View style={styles.profileImg}>
                    {/* Neste pedaço Vai ser a foto do Perfil ou siglas do nome */}
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
                    {/* Nome do usuário */}
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

    // Renderiza um DrawerLayoutAndroid para exibir um menu lateral.
    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={280}
            drawerPosition={"left"}
            renderNavigationView={() => <Menu toggleDrawer={toggleDrawer} />}
        >
            {/* Renderiza um TabNavigator com opções de configuração */}
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        // Lógica para definir o ícone e a função onPress com base no nome da rota
                        let iconName;

                        let iconSize = size * 1.5;
                        let onPress = () => {}; // Definir um valor padrão para onPress

                        if (route.name === "Index") {
                            iconName = "home";
                            onPress = () => console.log("Teste 1"); // Definir a função correta para onPress
                        } else if (route.name === "DetalhesFilme") {
                            iconName = "book";
                            onPress = () => console.log("Teste 2"); // Definir a função correta para onPress
                        }
                        // Retorna o ícone com o onPress correto
                        return (
                            <View style={styles.centeredIcon}>
                                <Icon
                                    name={iconName}
                                    type="material"
                                    color={color}
                                    size={iconSize}
                                    onPress={onPress} // Usar a função correta para onPress
                                />
                            </View>
                        );
                    },
                    tabBarLabel: () => null, // Oculta os rótulos da barra de navegação
                    tabBarActiveTintColor: "#000", // Cor do ícone ativo
                    tabBarInactiveTintColor: "#000", // Cor do ícone inativo
                    tabBarStyle: {
                        backgroundColor: "#52f6af", // Cor de fundo da barra de navegação
                        display: "flex", // Define a exibição da barra de navegação como flexível
                        flexDirection: "row", // Define a direção do eixo principal do contêiner como horizontal, o que significa que os itens serão dispostos em uma linha horizontal.
                    },
                })}
            >
                {/* Define as telas do TabNavigator */}
                <Tab.Screen
                    name="Index"
                    component={Home}
                    options={{
                        header: () => <Header openDrawer={toggleDrawer} />, // Adicione o cabeçalho personalizado no Home
                    }}
                />
                <Tab.Screen
                    name="DetalhesFilme"
                    component={DetalhesFilme}
                    options={{
                        header: () => <HeaderItem openDrawer={toggleDrawer} />, // Adicione o segundo cabeçalho personalizado no DetalhesFilme
                    }}
                />
            </Tab.Navigator>
        </DrawerLayoutAndroid>
    );
};

// Estilos para o componente TabBar.
const styles = StyleSheet.create({
    centeredIcon: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
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

// Exporta o componente TabBar para uso em outros arquivos.
export default TabBar;
