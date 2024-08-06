import Stock from "../Stock/Stock";
import "../StockInventario/stockInventario.css";
import SearchIcon from "@mui/icons-material/Search";

export default function StockInventario() {
  return (
    <div className="container-Stock">
      <header className="main-Stock">
        <h1>Inventario: 29 Productos</h1>

        <section>
          <button>Nuevo Articulo</button>
          <form action="/search" method="get">
            <div className="input-container">
              <input
                type="search"
                name="search"
                id="buscarItem"
                placeholder="Buscar Articulo.."
              />
              <SearchIcon className="search-icon" />
            </div>
          </form>
        </section>
      </header>
      <section className="container-table">
        <Stock />
      </section>
    </div>
  );
}
