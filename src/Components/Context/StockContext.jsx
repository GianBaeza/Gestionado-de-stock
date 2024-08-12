import { createContext, useState } from "react";
import EliminarAlert from "../EliminarAlert/EliminarAlert";
import useFilterProducts from "../Hooks/useFilterProducts";
import useOrdenProducts from "../Hooks/useOrdenProducts";

export const InventarioContext = createContext();

export default function InventarioProvider({ children }) {
  const [inventario, setInventario] = useState([]);
  const [sortStock, setSortStock] = useState(false);
  const [sortNombre, setSortNombre] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const filterProduct = useFilterProducts();
  const ordenProducts = useOrdenProducts();

  //Eliminar El Producto
  const handleDelete = (name) => {
    EliminarAlert({
      onConfirm: () => {
        const itemDelete = inventario.filter((item) => item.nombre !== name);
        setInventario(itemDelete);
      },
    });
  };

  //valor del inputSearch
  const handleChange = (e) => {
    const { value } = e.target;
    setValueSearch(value);
    let result;
    const isNumber = !isNaN(Number(valueSearch)) && valueSearch.trim() !== "";

    if (valueSearch.trim() === "" || valueSearch.length <= 0) {
      result = inventario;
    }
    //fil;tramos por codigo
    if (isNumber) {
      result = filterProduct(inventario, "codigo", valueSearch);
    } else {
      //fil;tramos por nombre
      const itemSetch = filterProduct(inventario, "nombre", valueSearch);
      result = itemSetch;
    }
    setInventario(result);
  };

  //Ordenamos por stock
  const handleOrdenClick = () => {
    setSortStock(!sortStock);
    const ordenStock = ordenProducts(inventario, "stock", sortStock);

    setInventario(ordenStock);
  };
  //Ordenamos por nombre
  const handleOrdenNombreClick = () => {
    setSortNombre(!sortNombre);
    const ordenNombre = ordenProducts(inventario, "nombre", sortNombre);
    setInventario(ordenNombre);
  };

  //addProducto
  const addNuevoProducto = (nuevoProducts) => {
    setInventario((prev) => [...prev, nuevoProducts]);
  };

  return (
    <InventarioContext.Provider
      value={{
        handleDelete,
        handleChange,
        valueSearch,
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
