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
    const { handleTheme, theme } = useContext(ThemeContextCustom);

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

    const colorFont = theme === 'dark' ? 'text-stone-300 hover:text-slate-200 cursor-pointer' : 'cursor-pointer text-stone-700 hover:text-stone-900';
    const searchColor = theme === 'dark' ? 'bg-gray-800 text-stone-300' : 'bg-[rgba(207,216,220)] text-stone-900';
    const estilosEditModal = modal.edit ? 'animate__animated animate__backInRight' : 'animate__animated animate__backOutRight';

    return (
        <div className={`dark:bg-slate-800 w-screen h-screen flex flex-col gap-10 p-10 justify-center items-center`}>
            <header className={` w-10/12 h-62 flex-wrap${theme === 'dark' ? 'dark:bg-slate-800' : 'bg-white'}`}>
                <section className="flex flex-col sm:flex-row  p-0  sm:items-end flex-wrap gap-64 ">
                    <h1 className={`text-4xl sm:text-8xl ${colorFont} `}>
                        InvenStock
                    </h1>
                    {modal.agregar && (
                        <AgregarProducto closeModal={handleCloseAgregarModal} />
                    )}
                    <div className={`p-5 sm:p-10 flex flex-col sm:flex-row justify-between gap-5 sm:gap-10 items-center border-2 border-stone-400 h-auto sm:h-20 rounded-lg ${theme === 'dark' ? 'dark:bg-slate-700' : 'bg-gray-100'}`}>
                        <ul className="flex flex-col sm:flex-row gap-5 sm:gap-10 items-center">
                            <li>
                                <label htmlFor="search" className="relative flex items-center overflow-hidden">
                                    <input
                                        type="search"
                                        name="search"
                                        id="buscarItem"
                                        placeholder="Buscar Articulo.."
                                        onChange={handleChange}
                                        className={`p-2 pl-2 pr-9  w-82 border-none rounded-lg shadow-inner ${searchColor} focus:outline-none focus:ring-none focus:none `}
                                    />
                                    <SearchIcon className={`absolute right-2 ${colorFont}`} />
                                </label>
                            </li>
                            <li>
                                <label htmlFor="inputCodigo" className={`flex items-center gap-1 ${colorFont}`}>
                                    <input
                                        type="checkbox"
                                        name="inputCodigo"
                                        checked={check}
                                        onChange={(e) => setCheck(e.target.checked)}
                                        className="cursor-pointer w-4 h-4"
                                    />
                                    Filtrar por Codigo
                                </label>
                            </li>
                            <li>
                                <a onClick={handleOpenAgregarModal} className={` ${colorFont}`}>
                                    Nuevo Articulo
                                </a>
                            </li>
                            <li>
                                <a onClick={() => limpiarInventario()} className={`${colorFont}`}>
                                    Borrar inventario
                                </a>
                            </li>
                            <li>
                                <ThemeSwitch handleTheme={handleTheme} theme={theme} />
                            </li>
                        </ul>
                    </div>
                </section>
            </header>
            <section className="w-screen">
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
