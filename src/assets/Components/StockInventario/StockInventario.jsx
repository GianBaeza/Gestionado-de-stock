import Stock from "../Stock/Stock";
import "../StockInventario/stockInventario.css";

export default function StockInventario() {
  return (
    <div className="container-Stock">
      <main className="main-Stock">
        <h1>Inventario: </h1>
        <button>Nuevo Articulo</button>
      </main>
      <section>
        <Stock />
      </section>
    </div>
  );
}
