import { useCallback, useContext, useState } from "react";
import Stock from "../Stock/Stock";
import "./stockInventario.css";
import SearchIcon from "@mui/icons-material/Search";
import AgregarProducto from "../AgregarProducto/AgregarProducto";
import { InventarioContext } from "../Context/StockContext";
import EditarModal from "../EditarProducto/EditarModal";



export default function StockInventario() {
    const [modal, setModal] = useState({
        edit: false,
        agregar: false
    });
    const [check, setCheck] = useState(false);
    const [editId, setEditId] = useState(null);
    const {
        filtrarInventario,
        inventario,
        editarItem,
        limpiarInventario
    } = useContext(InventarioContext);

    const handleOpenAgregarModal = useCallback(() => {
        setModal(prev => ({ ...prev, agregar: true }));
    }, []);

    const handleCloseAgregarModal = useCallback(() => {
        setModal(prev => ({ ...prev, agregar: false }));

    }, []);

    const handleOpenEditModal = useCallback((id) => {
        setEditId(id);
        setModal(prev => ({ ...prev, edit: true }));
    }, []);

    const handleCloseEditModal = useCallback(() => {
        setModal(prev => ({ ...prev, edit: false }));
    }, []);

    const handleChange = (e) => {
        filtrarInventario(e, check);
    };

    const addEditcion = (data) => {
        if (data) {
            editarItem(editId, data);
        }
        handleCloseEditModal(); // Cierra el modal después de guardar
    };

    return (
        <div className="container-Stock">
            <header className="main-Stock">
                <h1 className="h1">Inventario: {`${inventario.length} Productos`}</h1>
                <section>
                    <button onClick={handleOpenAgregarModal}>Nuevo Articulo</button>
                    {modal.agregar && (
                        <AgregarProducto closeModal={handleCloseAgregarModal} />
                    )}
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
                            <label htmlFor="inputCodigo">
                                Por codigo
                                <input
                                    type="checkbox"
                                    name="inputCodigo"
                                    checked={check}
                                    onChange={(e) => setCheck(e.target.checked)}

                                />
                            </label>
                            <button onClick={() => limpiarInventario()}>Borrar inventario </button>
                        </div>
                    </div>
                </section>
            </header>
            <section className="container-table">
                <Stock
                    inventario={inventario}
                    handleOpenEdit={handleOpenEditModal}
                />
            </section>

            {
                modal.edit && (
                    <EditarModal
                        handleCloseedit={handleCloseEditModal}
                        addEditcion={addEditcion}


                    />
                )
            }

        </div>
    );
}
