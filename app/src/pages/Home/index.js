// Este é um exemplo de componente de tela inicial (Home) de um aplicativo React Native que exibe gêneros de filmes com imagens usando a API do The Movie Database.

// Importa o React e o hook useEffect e useState para lidar com o estado e o ciclo de vida.
import React, { useEffect, useState } from "react";

// Importa o hook useNavigation do React Navigation para a navegação entre telas.
import { useNavigation } from "@react-navigation/native";
// Importa componentes específicos do React Native para construir a interface do usuário.
import {
    View,
    StyleSheet,
    ScrollView,
    FlatList,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";

// O componente Home exibe gêneros de filmes com imagens usando a API do The Movie Database.
const Home = () => {
    // Define estados para gêneros e imagens de gênero.
    const [genres, setGenres] = useState([]);
    const [genreImages, setGenreImages] = useState({});

    // Acesso à propriedade de navegação
    const navigation = useNavigation();

    // Função assíncrona para buscar os dados dos gêneros de filmes.
    const fetchGenreData = async () => {
        const api_key = "5158d713530806ecfe0b62e3ee98de38";
        const url = "https://api.themoviedb.org/3/genre/movie/list";
        const language = "pt-BR";
        const options = {
            method: "GET",
            headers: { accept: "application/json" },
        };

        try {
            const response = await fetch(
                `${url}?api_key=${api_key}&language=${language}`,
                options
            );
            const data = await response.json();
            return data.genres;
        } catch (error) {
            console.error("Erro ao buscar gêneros:", error);
            return [];
        }
    };

    // Função assíncrona para buscar imagens com base no ID do gênero.
    const fetchImages = async (genreId) => {
        const api_key = "5158d713530806ecfe0b62e3ee98de38";
        const url = "https://api.themoviedb.org/3/discover/movie";
        const options = {
            method: "GET",
            headers: { accept: "application/json" },
        };
        const queryParameters = `api_key=${api_key}&with_genres=${genreId}`;

        try {
            const response = await fetch(`${url}?${queryParameters}`, options);
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error("Erro ao buscar imagens por gênero:", error);
            return [];
        }
    };

    // Efeito para buscar dados dos gêneros e imagens ao carregar a tela.
    useEffect(() => {
        const fetchData = async () => {
            const genreData = await fetchGenreData();
            setGenres(genreData);
            const genreImagesData = {};

            for (const genre of genreData) {
                const images = await fetchImages(genre.id);
                genreImagesData[genre.id] = images;
            }

            setGenreImages(genreImagesData);
        };

        fetchData();
    }, []);

    // Função para lidar com o pressionamento da imagem do filme.
    const handleImagePress = (item) => {
        navigation.navigate("FazerPedido", { item });
    };

    // Função para renderizar os gêneros com imagens.
    const renderGenresWithImages = () => {
        return (
            <ScrollView style={styles.scrollView}>
                {genres.map((genre) => (
                    <View
                        key={genre.id}
                        style={
                            (styles.genreContainer,
                            { backgroundColor: "#E2E2E2" })
                        }
                    >
                        <Text style={styles.titleGender}>{genre.name}</Text>
                        <FlatList
                            data={genreImages[genre.id]}
                            horizontal={true}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handleImagePress(item)}
                                >
                                    <View style={{ backgroundColor: "#FFF" }}>
                                        <Image
                                            style={styles.genreImage}
                                            source={{
                                                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                                            }}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </View>
                ))}
            </ScrollView>
        );
    };

    return <>{renderGenresWithImages()}</>;
};

// Estilos para o componente Home.
const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        marginTop: -23,
    },
    container: {
        flex: 1,
        backgroundColor: "#52f6af",
    },
    navBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 35,
        paddingHorizontal: 20,
        width: "100%",
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: 14,
        paddingHorizontal: 0,
        marginBottom: 0,
        width: 180,
    },
    input: {
        backgroundColor: "#fff",
        paddingTop: 2,
        paddingLeft: 10,
        paddingBottom: 2,
        width: "70%",
        borderRadius: 14,
        borderWidth: 0,
        position: "relative",
        left: 0,
    },
    icon: {
        paddingHorizontal: 25,
    },
    titleGender: {
        fontSize: 25,
        fontWeight: "600",
        paddingLeft: 10,
        marginTop: 20,
        backgroundColor: "#FFF",
    },
    genreImage: {
        width: 135,
        height: 150,
        marginHorizontal: 0,
        marginTop: 5, // Adicione margem à esquerda
        marginRight: 12, // Adicione margem à direita
    },
});

// Exporta o componente Home para uso em outros arquivos.
export default Home;
