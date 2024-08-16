import { createContext, useCallback, useEffect, useState, useMemo } from "react";
import EliminarAlert from "../EliminarAlert/EliminarAlert";
import useFilterProducts from "../Hooks/useFilterProducts";
import useOrdenProducts from "../Hooks/useOrdenProducts";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import db from "../../firebase/config";

export const InventarioContext = createContext();

export default function InventarioProvider({ children }) {
  const [inventario, setInventario] = useState([]);
  const [originalInventario, setOriginalInventario] = useState([]); // Mantén una copia original del inventario
  const [sortStock, setSortStock] = useState(false);
  const [sortNombre, setSortNombre] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const filterProduct = useFilterProducts();
  const ordenProducts = useOrdenProducts();

  useEffect(() => {
    const fetchInventario = async () => {
      setLoading(true);
      try {
        const inventarioRef = collection(db, 'Stock');
        const resp = await getDocs(inventarioRef);
        const data = resp.docs.map((item) => ({ ...item.data(), id: item.id }));
        setOriginalInventario(data); // Guarda el inventario original
        setInventario(data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventario();
  }, []);

  // Eliminar Producto
  const handleDelete = (name) => {
    EliminarAlert({
      onConfirm: () => {
        setInventario((prevInventario) => prevInventario.filter((item) => item.nombre !== name));
      },
    });
  };

  // Filtrar Inventario
  const handleChange = useCallback((e) => {
    const query = e.target.value;
    setValueSearch(query);

    if (query.length === 0) {
      // Restablecer inventario cuando el input está vacío
      setInventario(originalInventario);
    } else {
      // Filtrar inventario
      const isNumber = !isNaN(Number(query));
      const filteredInventario = filterProduct(originalInventario, isNumber ? "codigo" : "nombre", query);
      setInventario(filteredInventario);
    }
  }, [originalInventario, filterProduct]);

  // Ordenar por stock
  const handleOrdenClick = useCallback(() => {
    setSortStock((prev) => !prev);
    const sortedStock = ordenProducts(inventario, "stock", !sortStock);
    setInventario(sortedStock);
  }, [inventario, sortStock, ordenProducts]);

  // Ordenar por nombre
  const handleOrdenNombreClick = useCallback(() => {
    setSortNombre((prev) => !prev);
    const sortedNombre = ordenProducts(inventario, "nombre", !sortNombre);
    setInventario(sortedNombre);
  }, [inventario, sortNombre, ordenProducts]);

  // Agregar nuevo producto
  const addNuevoProducto = (nuevoProducto) => {
    setInventario((prev) => [...prev, nuevoProducto]);
  };

  // Editar producto
  const editarItem = async (id, data) => {
    try {
      // Crea una nueva versión del inventario con el ítem editado
      const newEditItem = inventario.map((item) =>
        item.id === id
          ? {
              ...item,
              nombre: data.nombre || item.nombre,
              stock: data.stock || item.stock,
              codigo: data.codigo || item.codigo,
              lista: data.lista || item.lista,
              venta: data.venta || item.venta,
            }
          : item
      );
  
      // Actualizo el documento en Firestore
      const itemRef = doc(db, 'Stock', id);
      await updateDoc(itemRef, {
        nombre: data.nombre,
        stock: data.stock,
        codigo: data.codigo,
        lista: data.lista,
        venta: data.venta,
      });
  
      // Actualiza el estado local con el nuevo inventario
      setInventario(newEditItem);
    } catch (error) {
      console.error('Error updating item:', error);
    }
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
        editarItem,
        loading
      }}
    >
      {children}
    </InventarioContext.Provider>
  );
}
