import { StatusBar } from "expo-status-bar";
import Routes from "./src/routes";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
    return (
        <>
            <NavigationContainer>
                <StatusBar backgroundColor="#000" style="light" />
                <Routes />
            </NavigationContainer>
        </>
    );
}
