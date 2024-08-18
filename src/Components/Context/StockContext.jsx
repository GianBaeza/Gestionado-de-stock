import { createContext, useEffect, useState } from "react";
import EliminarAlert from "../EliminarAlert/EliminarAlert";
import useOrdenProducts from "../Hooks/useOrdenProducts";
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc, where, query } from "firebase/firestore";
import { remove } from "firebase/database";
import db from "../../Services/config";


export const InventarioContext = createContext();

export default function InventarioProvider({ children }) {
  const [inventario, setInventario] = useState([]); 
  const [sortStock, setSortStock] = useState(false);
  const [sortNombre, setSortNombre] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [loading, setLoading] = useState(false);


const ordenProducts = useOrdenProducts();
const fetchInventario = async () => {
    try {
      setLoading(true);
      const inventarioRef = collection(db, 'inventario');
      const resp = await getDocs(inventarioRef);
      const data = resp.docs.map((item) => ({ ...item.data(), id: item.id }));
      setInventario(data);
    } catch (error) {
      console.error("Error fetching inventario:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventario(); // Carga inicial de datos
  }, []);

  // Agregar nuevo producto
 const addNuevoProducto = async (nuevoProducto) => {
  try {
    const docRef = await addDoc(collection(db, 'inventario'), nuevoProducto);
    setInventario((prev) => [...prev, { ...nuevoProducto, id: docRef.id }]);
  } catch (error) {
    console.error("Error adding new product:", error);
  }
};

  // Eliminar Producto
 const deleteItem = (id) => {
  EliminarAlert({
    onConfirm: async () => {
      try {
        const itemDocRef = doc(db, 'inventario', id);
        await remove(itemDocRef);
        const productoDelete = inventario.filter((item) => item.id !== id)
        setInventario(productoDelete);
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    },
  });
};


  // Filtrar Inventario
  const filtrarInventario = async (e, check) => {
  const queryValue = e.target.value;
  setValueSearch(queryValue);

  if (queryValue.trim() === "") {
    // Si el campo  está vacío, carga todos los productos
    fetchInventario(); 
  } else {
    try {
      // Crear una consulta filtrando por el nombre
      const inventarioRef = collection(db, 'inventario');
     const queryFilter = queryValue.toUpperCase()
      const q = check ? query(inventarioRef, where('codigo', '>=', queryFilter), where('codigo', '<=', queryFilter + '\uf8ff')) : query(inventarioRef, where('nombre', '>=', queryFilter), where('nombre', '<=', queryFilter + '\uf8ff'))
        const resp = await getDocs(q)
        const data = resp.docs.map((item) => ({ ...item.data(), id: item.id }));
      setInventario(data);
      
    } catch (error) {
      console.error( error);
    }
    }
    
};
   

 // Editar producto
  const editarItem = async (id, data) => { 
  
      try {
    const itemDocRef = doc(db, 'inventario', id);
    await updateDoc(itemDocRef, data);
    setInventario((prev) =>
      prev.map((item) => (item.id === id ?{
              ...item,
              nombre: data.nombre|| item.nombre,
              stock: data.stock || item.stock,
              codigo: data.codigo.toUpperCase() || item.codigo,
              lista: data.lista || item.lista,
              venta: data.venta || item.venta,
            }
          : item))
    );
  } catch (error) {
    console.error("Error updating item:", error);
  }
  };

  
  // Ordenar por stock
  const ordenarXStock = () => {
    setSortStock((prev) => !prev);
    const sortedStock = ordenProducts(inventario, "stock", !sortStock);
    setInventario(sortedStock);
  };

  // Ordenar por nombre
  const ordenarXNombre = () => {
    setSortNombre((prev) => !prev);
    const sortedNombre = ordenProducts(inventario, "nombre", !sortNombre);
    setInventario(sortedNombre);
  }



 

  return (
    <InventarioContext.Provider
      value={{
        deleteItem,
        filtrarInventario,
        valueSearch,
        ordenarXStock,
        ordenarXNombre,
        EliminarAlert,
        inventario,
        addNuevoProducto,
        editarItem,
        loading
      }}
    >
      {children}
    </InventarioContext.Provider>
  );
}
