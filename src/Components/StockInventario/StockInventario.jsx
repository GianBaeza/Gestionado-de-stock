import { useCallback, useContext, useState } from "react";
import Stock from "../Stock/Stock";
import "./stockInventario.css";
import SearchIcon from "@mui/icons-material/Search";
import AgregarProducto from "../AgregarProducto/AgregarProducto";
import { InventarioContext } from "../Context/StockContext";
import EditarModal from "../EditarProducto/EditarModal";

export default function StockInventario() {
    const [openModal, setOpenModal] = useState({
        agregar: false,
        edit: false
    });
    const [check, setCheck] = useState(false);
    const [editId, setEditId] = useState(null);
    const {
        filtrarInventario,
        inventario,
        editarItem
    } = useContext(InventarioContext);

    const handleOpenAgregarModal = useCallback(() => {
        setOpenModal(prev => ({ ...prev, agregar: true }))
    }, []);

    const handleCloseAgregarModal = useCallback(() => {
        setOpenModal(prev => ({ ...prev, agregar: false }));
    }, []);

    const handleOpenEditModal = useCallback((id) => {
        setEditId(id);
        setOpenModal(prev => ({ ...prev, edit: true }));
    }, []);

    const handleCloseEditModal = useCallback(() => {
        setOpenModal(prev => ({ ...prev, edit: false }));
    }, []);

    const handleChange = (e) => {
        filtrarInventario(e, check);
    };

    const addEditcion = (data) => {
        if (data) {
            editarItem(editId, data)
        }
        handleCloseEditModal()
    }


    return (
        <div className="container-Stock">
            <header className="main-Stock">
                <h1>Inventario: {`${inventario.length} Productos`}</h1>
                <section>
                    <button onClick={handleOpenAgregarModal}>Nuevo Articulo</button>
                    {openModal.agregar && (
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
            {openModal.edit && (
                <EditarModal handleCloseedit={handleCloseEditModal} addEditcion={addEditcion} />
            )}
        </div>
    );
}
