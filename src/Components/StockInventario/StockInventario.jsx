import { useContext, useState, useCallback } from "react";
import Stock from "../Stock/Stock";
import AgregarProducto from "../AgregarProducto/AgregarProducto";
import { InventarioContext } from "../Context/StockContext";
import EditarModal from "../EditarProducto/EditarModal";
import 'animate.css';
import SearchIcon from "@mui/icons-material/Search";
import { ThemeContextCustom } from "../Context/ThemeContext";
import ThemeSwitch from "./ButtonTheme/ThemeButton";
import logoLight from "../../../public/logo/2.png";
import logoDark from "../../../public/logo/1.png"
import Footer from "../Footer/Footer";
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
    const logoImg = theme === 'dark' ? logoDark : logoLight

    return (
        <div className={`dark:bg-slate-800 w-screen h-screen flex flex-col gap-10 max-2xl:gap-4 p-10 justify-center  items-center`}>
            <header className={`  w-screen   h-42 flex-wrap${theme === 'dark' ? 'dark:bg-slate-800' : 'bg-white'}  max-2xl:items-center max-2xl:flex max-2xl:justify-center`}>
                <section className=" 0 flex flex-col sm:flex-row p-0 sm:items-end flex-wrap gap-64  max-2xl:gap-10 sm:text-center sm:justify-center ">
                    <div className="flex justify-center items-end gap-2 text-end">
                        <img src={logoImg} alt="logo" className="h-28" />
                        <h1 className={`text-8xl max-2xl:text-6xl ${colorFont} max-2xl:mt-4 font-semibold`}>Stock</h1>
                    </div>
                    {modal.agregar && (
                        <AgregarProducto closeModal={handleCloseAgregarModal} />
                    )}
                    <div className={` p-5 flex flex-col sm:flex-row justify-between gap-5 sm:gap-0 items-center border-2 border-stone-400 h-auto max-xl:h-20  rounded-lg ${theme === 'dark' ? 'dark:bg-slate-700' : 'bg-gray-100'}`}>
                        <ul className="flex flex-col sm:flex-row gap-5  items-center">
                            <li >
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
                            <li className="sm:col-start-1">
                                <label htmlFor="inputCodigo" className={`flex items-center gap-1 ${colorFont}`}>
                                    <input
                                        type="checkbox"
                                        name="inputCodigo"
                                        checked={check}
                                        onChange={(e) => setCheck(e.target.checked)}
                                        className="cursor-pointer w-4 h-4 max-xl:text-l"
                                    />
                                    Por Codigo
                                </label>
                            </li>
                            <li>
                                <a onClick={handleOpenAgregarModal} className={` ${colorFont} max-xl:text-l`}>
                                    Nuevo Articulo
                                </a>
                            </li>
                            <li>
                                <a onClick={() => limpiarInventario()} className={`${colorFont} max-xl:text-l`}>
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
            <footer>
                <Footer theme={theme} />
            </footer>
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
