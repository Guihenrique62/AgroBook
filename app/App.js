import { StatusBar } from "expo-status-bar";
import Routes from "./src/routes";

export default function App() {
    return (
        <>
            <StatusBar backgroundColor="#0e91e3" style="light" />
            <Routes />
        </>
    );
}
