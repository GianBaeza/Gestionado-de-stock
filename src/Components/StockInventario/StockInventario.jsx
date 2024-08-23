import { useContext, useState, useCallback } from "react";
import Stock from "../Stock/Stock";
import AgregarProducto from "../AgregarProducto/AgregarProducto";
import { InventarioContext } from "../Context/StockContext";
import EditarModal from "../EditarProducto/EditarModal";
import 'animate.css';
import SearchIcon from "@mui/icons-material/Search";
import { ThemeContextCustom } from "../Context/ThemeContext";
import ThemeSwitch from "./ButtonTheme/ThemeButton";

export default function StockInventario() {
    const [modal, setModal] = useState({
        edit: false,
        agregar: false
    });
    const [check, setCheck] = useState(false);
    const [editId, setEditId] = useState(null);
    const { filtrarInventario, inventario, editarItem, limpiarInventario } = useContext(InventarioContext);
    const { handleTheme, theme } = useContext(ThemeContextCustom)

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
        handleCloseEditModal();
    };



    const colorFont = theme === 'dark' ? `text-stone-300 ` : 'text-stone-800';
    const searchColor = theme === 'dark' ? 'bg-gray-200' : 'bg-gray-200 bg-slate-500';
    const estilosEditModal = modal.edit ? 'animate__animated animate__backInRight' : 'animate__animated animate__backOutRight';


    return (
        <div className={`container-Stock ${theme === 'dark' ? 'dark:bg-slate-800' : ''}  h-svh w-full`}>
            <header className=" flex gap-4 p-5 m-0 w-full justify-center h-52">

                <section className="w-5/5  flex gap-20 p-0 justify-end items-end flex-wrap">
                    <h1 className={`text-8xl ${colorFont}`}>InvenStock</h1>
                    {modal.agregar && (
                        <AgregarProducto closeModal={handleCloseAgregarModal} />
                    )}
                    <div className="p-10 flex  py-0  justify-start  gap-10 items-center order-solid border-2 border-stone-400 h-20 rounded-lg"  >

                        <label htmlFor="search" className='overflow-hidden'>
                            <input
                                type="search"
                                name="search"
                                id="buscarItem"
                                placeholder="Buscar Articulo.."
                                onChange={handleChange}
                                className={`p-2 text-stone-900 pl-2 border-none rounded-lg bg-gray-10 shadow-inner ${searchColor}`}
                            />

                            <SearchIcon className="relative right-8  text-stone-300" />
                        </label>
                        <label htmlFor="inputCodigo" className={` flex gap-1 ${colorFont}`}>
                            <input
                                type="checkbox"
                                name="inputCodigo"
                                checked={check}
                                onChange={(e) => setCheck(e.target.checked)}
                            />
                            Por código
                        </label>
                        <ul className="flex gap-10">
                            <li>
                                <a onClick={handleOpenAgregarModal} className={`cursor-pointer ${colorFont}`}>Nuevo Articulo</a>
                            </li>
                            <li>
                                <a onClick={() => limpiarInventario()} className={`cursor-pointer ${colorFont}`}>Borrar inventario </a>
                            </li>
                            <li>
                                <ThemeSwitch handleTheme={handleTheme} theme={theme} />
                            </li>
                        </ul>
                    </div>


                </section>
            </header>
            <section className="container-table">
                <Stock id="Render Stock" inventario={inventario} handleOpenEdit={handleOpenEditModal} />
            </section>
            {modal.edit && (
                <EditarModal
                    handleCloseedit={handleCloseEditModal}
                    addEditcion={addEditcion}
                    estiloAnimacion={estilosEditModal}
                />
            )}
        </div>
    );
}
