import "../src/app.css";
import InventarioProvider from "./Components/Context/StockContext";
import StockInventario from "./Components/StockInventario/StockInventario";
import ThemeContextProvider from "./Components/Context/ThemeContext"; // Asegúrate de que este es el archivo correcto
import { useContext } from "react";
import { ThemeContext } from "@emotion/react";

function App() {
    const { changeTheme } = useContext(ThemeContext)


    const handleClickTheme = () => {
        changeTheme()
    }

    return (

        <InventarioProvider>
            <ThemeContextProvider>
                <StockInventario />
            </ThemeContextProvider>

        </InventarioProvider>

    );
}

export default App;