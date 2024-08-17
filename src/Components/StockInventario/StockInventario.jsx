import { useCallback, useContext, useState } from "react";
import Stock from "../Stock/Stock";
import "./stockInventario.css";
import SearchIcon from "@mui/icons-material/Search";
import AgregarProducto from "../AgregarProducto/AgregarProducto";
import { InventarioContext } from "../Context/StockContext";
import EditarModal from "../EditarProducto/EditarModal";

export default function StockInventario() {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [check, setCheck] = useState(false);
  const [editId, setEditId] = useState(null);
  const {
    deleteItem,
    filtrarInventario,
    ordenarXStock,
    ordenarXNombre,
    valueSearch,
    inventario,
    loading,
  } = useContext(InventarioContext);

  const handleOpenAgregarModal = useCallback(() => {
    setOpenModalAdd(prev => !prev);
  }, []);

  const handleCloseAgregarModal = useCallback(() => {
    setOpenModalAdd(false);
  }, []);

  const handleOpenEditModal = useCallback((id) => {
    setEditId(id);
    setOpenModalEdit(true);
    
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setOpenModalEdit(false);
    console.log('rendersOrCloseModal')
  }, []);

  const handleOrdenNombreClick = useCallback(() => {
    ordenarXNombre();
    console.log('rendersOrdenNOMBRE')
  }, [ordenarXNombre]);

  const handleOrdenarStock = useCallback(() => {
    ordenarXStock();
    console.log('rendersOrdenarstoc')
  }, [ordenarXStock]);

  const handleDelete = useCallback((name, id) => {
    deleteItem(name, id);
    console.log('rendersDelete')
  }, [deleteItem]);

  const handleChange = useCallback((e) => {
    filtrarInventario(e, check);
      console.log('render')
  }, [check, filtrarInventario]);

  return (
    <div className="container-Stock">
      <header className="main-Stock">
        <h1>Inventario: {`${inventario.length} Productos`}</h1>
        <section>
          <button onClick={handleOpenAgregarModal}>Nuevo Articulo</button>
          {openModalAdd && <AgregarProducto closeModal={handleCloseAgregarModal} />}
          <div>
            <div className="input-container">
              <SearchIcon className="search-icon" />
              <input
                type="search"
                name="search"
                id="buscarItem"
                placeholder="Buscar Articulo.."
                onChange={handleChange}
                value={valueSearch}
              />
              <label htmlFor="inputCodigo">
                Por codigo
                <input
                  type="checkbox"
                  name="inputCodigo"
                  checked={check}
                  onChange={e => setCheck(e.target.checked)}
                />
              </label>
            </div>
          </div>
        </section>
      </header>
      <section className="container-table">
        <Stock
          handleDelete={handleDelete}
          inventario={inventario}
          handleOrdenClick={handleOrdenarStock}
          handleOrdenNombreClick={handleOrdenNombreClick}
          handleOpenEdit={handleOpenEditModal}
          loading={loading}
        />
      </section>
      {openModalEdit && <EditarModal handleCloseedit={handleCloseEditModal} itemId={editId} />}
    </div>
  );
}
