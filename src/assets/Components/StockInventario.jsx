import Stock from "./Stock/Stock";

export default function StockInventario() {
  return (
    <div>
      <main>
        <h1>Inventario: </h1>
        <button>Nuevo Articulo</button>
        <section>
          <Stock />
        </section>
      </main>
    </div>
  );
}
