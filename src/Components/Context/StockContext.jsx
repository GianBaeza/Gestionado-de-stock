import { createContext, useEffect, useState } from "react";
import EliminarAlert from "../EliminarAlert/EliminarAlert";
import useOrdenProducts from "../Hooks/useOrdenProducts";
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import db from "../../Services/config";


export const InventarioContext = createContext();




export default function InventarioProvider({ children }) {
    const [inventario, setInventario] = useState([]);
    const [cloneInventario, setCloneInventario] = useState([]);
    const [ordenar, setOrdenar] = useState({
        sortStock: true,
        sortNombre: true
    });
    const [valueSearch, setValueSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const ordenProducts = useOrdenProducts()



    const fetchInventario = async () => {

        try {
            setLoading(true);
            const inventarioRef = collection(db, 'inventario');
            const resp = await getDocs(inventarioRef);
            const data = resp.docs.map((item) => ({ ...item.data(), id: item.id }));
            setCloneInventario(data)
            setInventario(data);

        } catch (error) {
            console.error("Error fetching inventario:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInventario()
    }, []);


    // Agregar nuevo producto
    const addNuevoProducto = async (data) => {
        const fechaDate = new Date(data.fecha)



        const nuevoProducto = {
            id: Date.now(),
            nombre: data.nombre,
            fecha: fechaDate,
            stock: Number(data.stock),
            codigo: data.codigo.toUpperCase(),
            lista: parseFloat(data.lista),
            venta: parseFloat(data.venta),
        }
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
                    // Referencia al documento en la colección inventario
                    const itemRef = doc(db, 'inventario', id);

                    // Eliminar el documento
                    await deleteDoc(itemRef);

                    // Refrescar el inventario o realizar otra acción necesaria
                    fetchInventario();
                } catch (error) {
                    console.error("Error deleting item:", error);
                }
            },
        });
    };


    // Filtrar Inventario
    const filtrarInventario = (e, check) => {
        const queryValue = e.target.value.toLowerCase();
        setValueSearch(queryValue);

        if (queryValue.trim() == "" || queryValue.length < 1) {
            setInventario(cloneInventario)
        } else {
            const filteredData = inventario.filter(item => {
                return check
                    ? item.codigo.toLowerCase().includes(queryValue)
                    : item.nombre.toLowerCase().includes(queryValue);
            });
            setInventario(filteredData);
        }
    };

    // Editar producto
    const editarItem = async (id, data) => {


        try {
            const itemDocRef = doc(db, 'inventario', id);


            const primerelemento = inventario.find((item) => item.id === id)

            const itemEditado = {

                nombre: data.nombre || primerelemento.nombre,
                stock: data.stock || primerelemento.stock,
                codigo: data.codigo || primerelemento.codigo,
                lista: data.lista || primerelemento.lista,
                venta: data.venta || primerelemento.venta,

            }
            console.log(itemEditado)

            await updateDoc(itemDocRef, itemEditado);
            fetchInventario()
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };


    // Ordenar por stock
    const ordenarXStock = () => {
        setOrdenar((prev) => ({ ...prev, sortStock: !prev.sortStock }));

        const sortedStock = ordenProducts(inventario, 'stock', !ordenar.sortStock);
        setInventario(sortedStock);
    };

    // Ordenar por nombre
    const ordenarXNombre = () => {
        setOrdenar((prev) => ({ ...prev, sortNombre: !prev.sortNombre }));
        const sortedNombre = ordenProducts(inventario, 'nombre', !ordenar.sortNombre);
        setInventario(sortedNombre);
    };

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
