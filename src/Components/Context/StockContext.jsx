import { createContext, useEffect, useState } from "react";
import EliminarAlert from "../EliminarAlert/EliminarAlert";
import useFilterProducts from "../Hooks/useFilterProducts";
import useOrdenProducts from "../Hooks/useOrdenProducts";

export const InventarioContext = createContext();

export default function InventarioProvider({ children }) {
  const [inventario, setInventario] = useState(() => {
    const getInventario = localStorage.getItem("inventario");
   try {
    return getInventario ? JSON.parse(getInventario) : [];
  } catch (e) {
    return [];
  }
  });
  const [sortStock, setSortStock] = useState(false);
  const [sortNombre, setSortNombre] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const filterProduct = useFilterProducts();
  const ordenProducts = useOrdenProducts();
   
    
   

  
  // Guardar inventario en localStorage cuando cambie
  useEffect(() => {

     if(inventario !== undefined){
      localStorage.setItem("inventario", JSON.stringify(inventario));
     }
     
  }, [inventario]);
  
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
    const query = e.target.value;
    setValueSearch(query);
    
    let result;
    const isNumber = !isNaN(Number(valueSearch)) && valueSearch.trim() !== "";

    if (query.trim() === " ") {
      setInventario(inventario)
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
  const handleOrdenClick =  () => {
    setSortStock(!sortStock);
    const ordenStock = ordenProducts(inventario, "stock", sortStock);
    setInventario(ordenStock);
  }

  //Ordenamos por nombre
  const handleOrdenNombreClick = () => {
    setSortNombre(!sortNombre);
    const ordenNombre = ordenProducts(inventario, "nombre", sortNombre);
    setInventario(ordenNombre);
  }

  //addProducto
  const addNuevoProducto = (nuevoProducts) => {
    setInventario((prev) => [...prev, nuevoProducts]);
    
  };
    

   const editarItem = ((id, data)=>{
      const newEditItem = inventario.map((item) => item.id === id ? {
        ...item, 
        nombre: data.nombre || item.nombre,
        stock : data.stock || item.stock,
        codigo : data.codigo || item.codigo,
        lista:  data.lista  || item.lista,
        venta : data.venta || item.venta

    } : item)
      setInventario(newEditItem)
      
   })
      

     
    
   
   

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
        editarItem
      }}
    >
      {children}
    </InventarioContext.Provider>
  );
}
