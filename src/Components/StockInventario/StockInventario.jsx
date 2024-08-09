import useFilterProducts from "../Hooks/useFilterProducts";
import Stock from "../Stock/Stock";
import "./stockInventario.css";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import useOrdenProducts from "../Hooks/useOrdenProducts";

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
  const [sortStock, setSortStock] = useState(false);
  const [sortNombre, setSortNombre] = useState(false);
  const filterProduct = useFilterProducts();
  const ordenProducts = useOrdenProducts();

  const handleDelete = (name) => {
    const itemDelete = inventario.filter((item) => item.nombre !== name);
    setInventario(itemDelete);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    let result;
    const isNumber = !isNaN(Number(value)) && value.trim() !== "";

    if (value.trim() === "" || value.length <= 0) {
      result = inventario;
    }
    //fil;tramos por codigo
    if (isNumber) {
      result = filterProduct(Inventario, "codigo", value);
    } else {
      //fil;tramos por nombre
      const itemSetch = filterProduct(Inventario, "nombre", value);
      result = itemSetch;
    }
    setInventario(result);
  };

  const handleOrdenClick = () => {
    //ordenamos por stock
    setSortStock(!sortStock);
    const ordenStock = ordenProducts(inventario, "stock", sortStock);

    setInventario(ordenStock);
  };

  const handleOrdenNombreClick = () => {
    //ordenamos por nombre
    setSortNombre(!sortNombre);
    const ordenNombre = ordenProducts(inventario, "nombre", sortNombre);
    setInventario(ordenNombre);
  };
  return (
    <div className="container-Stock">
      <header className="main-Stock">
        <h1>Inventario: {`${Inventario.length} Productos`}</h1>

        <section>
          <button>Nuevo Articulo</button>
          <div>
            <div className="input-container">
              <SearchIcon className="search-icon" />
              <input
                type="search"
                name="search"
                id="buscarItem"
                placeholder="Buscar Articulo.."
                onChange={handleChange}
              />
            </div>
          </div>
        </section>
      </header>
      <section className="container-table">
        <Stock
          handleDelete={handleDelete}
          inventario={inventario}
          handleOrdenClick={handleOrdenClick}
          handleOrdenNombreClick={handleOrdenNombreClick}
        />
      </section>
    </div>
  );
}
