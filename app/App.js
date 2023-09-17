import { StatusBar } from "expo-status-bar";
import Routes from "./src/routes";

export default function App() {
    return (
        <>
            <StatusBar backgroundColor="#FFFFFF" style="dark" />
            <Routes />
        </>
    );
}
