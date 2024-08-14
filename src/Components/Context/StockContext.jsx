import { createContext, useEffect, useState } from "react";
import EliminarAlert from "../EliminarAlert/EliminarAlert";
import useFilterProducts from "../Hooks/useFilterProducts";
import useOrdenProducts from "../Hooks/useOrdenProducts";


export const InventarioContext = createContext();

 const  stockInicial = JSON.parse(localStorage.getItem('stock')|| [])
     
  
export default function InventarioProvider({ children }) {
  const [inventario, setInventario] = useState(stockInicial)
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
    const query = e.target.value;
    setValueSearch(query);
 
    const isNumber = !isNaN(Number(query));
    
       if(query.length > 0){
        const filtrarInventario  = isNumber  ?  filterProduct(stockInicial, "codigo", query) : filterProduct(stockInicial, "nombre", query)
        setInventario(filtrarInventario)
       }else{
        setInventario(stockInicial)
       }
 
     
    
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
      

     useEffect(()=>{
        localStorage.setItem('stock',JSON.stringify(inventario))
     ,[inventario]})
    
   
   

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
