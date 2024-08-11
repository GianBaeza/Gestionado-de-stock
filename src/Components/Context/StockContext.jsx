import { createContext, useState, useId } from "react";
import EliminarAlert from "../EliminarAlert/EliminarAlert";
import useFilterProducts from "../Hooks/useFilterProducts";
import useOrdenProducts from "../Hooks/useOrdenProducts";

export const InventarioContext = createContext();

export default function InventarioProvider({ children }) {
  const [inventario, setInventario] = useState([]);
  const [sortStock, setSortStock] = useState(false);
  const [sortNombre, setSortNombre] = useState(false);
  const filterProduct = useFilterProducts();
  const ordenProducts = useOrdenProducts();

  const handleDelete = (name) => {
    EliminarAlert({
      onConfirm: () => {
        const itemDelete = inventario.filter((item) => item.nombre !== name);
        setInventario(itemDelete);
      },
    });
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
      result = filterProduct(inventario, "codigo", value);
    } else {
      //fil;tramos por nombre
      const itemSetch = filterProduct(inventario, "nombre", value);
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

  const addNuevoProducto = (nuevoProducts) => {
    setInventario((prev) => [...prev, nuevoProducts]);
  };

  return (
    <InventarioContext.Provider
      value={{
        handleDelete,
        handleChange,
        handleOrdenClick,
        handleOrdenNombreClick,
        EliminarAlert,
        inventario,
        addNuevoProducto,
      }}
    >
      {children}
    </InventarioContext.Provider>
  );
}
