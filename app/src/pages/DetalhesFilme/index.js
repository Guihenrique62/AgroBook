// Importa o React e o hook useState para lidar com o estado.
import React from "react";
// Importa componentes específicos do React Native para construir a interface do usuário.
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";

// O componente DetalhesFilmeScreen exibe os detalhes de um filme específico.
const DetalhesFilmeScreen = ({ route }) => {
    // Lógica para recuperar o objeto item dos parâmetros de rota.
    const item = route?.params?.item;

    // Lógica de tratamento para quando o objeto item é undefined ou não possui a propriedade poster_path.
    if (!item || !item.poster_path) {
        return <Text>Não foi possível carregar os detalhes do filme.</Text>;
    }

    // Lógica para manipular o evento de reserva do filme.
    const handleReservar = () => {
        console.log("Filme reservado: ", item);
    };

    // Componente interno para exibir os detalhes do filme.
    const ViewItem = () => {
        return (
            <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
                <View style={styles.container}>
                    <View style={styles.imageAndDetailsContainer}>
                        <Image
                            style={styles.filmImage}
                            source={{
                                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                            }}
                        />
                        <View style={styles.detailsContainer}>
                            <Text style={styles.detailText}>
                                Número de Páginas: 120
                            </Text>
                            <Text style={styles.detailText}>
                                Autor: John Doe
                            </Text>
                            <Text style={styles.detailText}>
                                Lançamento: 15 de Outubro de 2023
                            </Text>
                            <Text style={styles.detailText}>
                                Idioma: Inglês
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.filmTitle}>{item.title}</Text>
                    <Text style={styles.filmOverview}>{item.overview}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleReservar}
                    >
                        <Text style={styles.buttonText}>Fazer Pedido</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    };

    return <ViewItem />;
};

// Estilos para o componente DetalhesFilmeScreen.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 30,
    },
    imageAndDetailsContainer: {
        marginVertical: 0,
        flexDirection: "row",
        marginBottom: 5,
    },
    filmImage: {
        marginTop: 30,
        width: 150,
        height: 200,
        marginRight: 8,
    },
    detailsContainer: {
        flex: 1,
        justifyContent: "center",
    },
    detailText: {
        fontSize: 15,
        marginBottom: 10,
    },
    filmTitle: {
        marginVertical: 15,
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 22,
    },
    filmOverview: {
        fontSize: 17,
        textAlign: "left",
        marginBottom: -55,
    },
    button: {
        backgroundColor: "#2D9F6E",
        padding: 10,
        borderRadius: 5,
        marginTop: 90,
        width: 220,
        marginLeft: "auto",
        marginRight: "auto",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
});

// Exporta o componente DetalhesFilmeScreen para uso em outros arquivos.
export default DetalhesFilmeScreen;
