import "../src/app.css";
import InventarioProvider from "./Components/Context/StockContext";
import StockInventario from "./Components/StockInventario/StockInventario";

function App() {

    return (
        <>
            {" "}
            <InventarioProvider>

                <main>
                    <StockInventario />
                </main>

            </InventarioProvider>
        </>
    );
}

export default App;
