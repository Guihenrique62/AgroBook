import { StatusBar } from "expo-status-bar";
import Routes from "./src/routes";

export default function App() {
    return (
        <>
            {/* <StatusBar backgroundColor="#52f6af" style="dark" /> */}
            <StatusBar backgroundColor="#000" style="light" />
            <Routes />
        </>
    );
}
