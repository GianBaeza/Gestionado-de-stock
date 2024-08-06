import Stock from "../Stock/Stock";
import "../StockInventario/stockInventario.css";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const Inventario = [
  { nombre: "Dog Food", stock: 100, codigo: 2001, lista: 50.0, venta: 45.0 },
  { nombre: "Cat Toy", stock: 150, codigo: 2002, lista: 10.0, venta: 8.0 },
  { nombre: "Bird Cage", stock: 50, codigo: 2003, lista: 12000, venta: 110.0 },
  {
    nombre: "Fish Tank",
    stock: 30,
    codigo: 2004,
    lista: 200.0,
    venta: 18330.0,
  },
  { nombre: "Rabbit Food", stock: 80, codigo: 2005, lista: 25.0, venta: 20.0 },
];
export default function StockInventario() {
  const [inventario, setInventario] = useState(Inventario);

  const handleDelete = (name) => {
    const itemDelete = inventario.filter((item) => item.nombre !== name);

    setInventario(itemDelete);
  };

  return (
    <div className="container-Stock">
      <header className="main-Stock">
        <h1>Inventario: 29 Productos</h1>

        <section>
          <button>Nuevo Articulo</button>
          <form action="/search" method="get">
            <div className="input-container">
              <SearchIcon className="search-icon" />
              <input
                type="search"
                name="search"
                id="buscarItem"
                placeholder="Buscar Articulo.."
              />
            </div>
          </form>
        </section>
      </header>
      <section className="container-table">
        <Stock handleDelete={handleDelete} inventario={inventario} />
      </section>
    </div>
  );
}
