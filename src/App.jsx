import "../src/app.css";
import InventarioProvider from "./Components/Context/StockContext";
import StockInventario from "./Components/StockInventario/StockInventario";
import ThemeContextProvider from "./Components/Context/ThemeContext"; // Asegúrate de que este es el archivo correcto

function App() {





    return (
        <ThemeContextProvider>
            <InventarioProvider>


                <StockInventario />


            </InventarioProvider>
        </ThemeContextProvider>
    );
}

export default App;