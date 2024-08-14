import { createContext, useEffect, useState } from "react";
import EliminarAlert from "../EliminarAlert/EliminarAlert";
import useFilterProducts from "../Hooks/useFilterProducts";
import useOrdenProducts from "../Hooks/useOrdenProducts";
import { collection, getDocs} from "firebase/firestore";
import db from "../../firebase/config";


export const InventarioContext = createContext();


     
  
export default function InventarioProvider({ children }) {
  const [inventario, setInventario] = useState([])
  const [sortStock, setSortStock] = useState(false);
  const [sortNombre, setSortNombre] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const filterProduct = useFilterProducts();
  const ordenProducts = useOrdenProducts();
   


  useEffect(()=>{
     const inventarioRef = collection(db, 'Stock');
      getDocs(inventarioRef)
      .then((resp)=>{
        const data = (resp.docs.map((item)=>{
            return { ...item.data() , id: item.id}
          }))
          setInventario(data)
      })
     
  },[])
  
 

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
        const cloneInventario = [...inventario]
       if(query.length > 1){
        const filtrarInventario  = isNumber  ?  filterProduct(cloneInventario, "codigo", query) : filterProduct(cloneInventario, "nombre", query)
        setInventario(filtrarInventario)
       }else{
        setInventario(cloneInventario)
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
        venta : data.venta || item.venta,

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
