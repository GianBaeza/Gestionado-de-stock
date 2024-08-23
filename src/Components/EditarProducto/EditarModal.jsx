import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import "../EditarProducto/editarModal.css";
import 'animate.css';
import { useContext } from "react";
import { ThemeContextCustom } from "../Context/ThemeContext";
export default function EditarModal({ handleCloseedit, addEditcion, estiloAnimacion }) {
    const { register, handleSubmit } = useForm();
    const { theme } = useContext(ThemeContextCustom);


    const inputsEstilos = `w-full p-2 border border-gray-300 rounded-lg shadow-inner text-stone-800 ${theme === 'dark' ? 'bg-slate-200 text-stone-300 border-gray-600' : 'bg-gray-200'
        }`;

    const modalEstilos = theme !== 'dark' ? 'bg-slate-800 text-stone-100 formCssLight ' : 'bg-slate-50 text-stone-800 formCssDark';
    const backgroundModal = theme !== 'dark'
        ? 'bg-[rgba(0, 0, 0, 0.5)]'
        : 'bg-[rgba(255, 255, 255, 0.29)]';

    return (
        <>
            <main className={` fixed top-56 right-0 w-3/12 h-auto flex justify-end items-center z-[1000] transition-transform duration-1000 ease-in-out ${backgroundModal} `}>
                <form onSubmit={handleSubmit(addEditcion)} className={`${modalEstilos} form w-5/6 gap-4 p-5 flex flex-col ${estiloAnimacion} rounded-lg formCss mr-10`}>
                    <button type="button" onClick={handleCloseedit} className="relative left-40 m-auto">
                        <CloseIcon />
                    </button>

                    <h2 className="text-center text-2xl">Editar Producto</h2>

                    <input
                        type="text"
                        {...register("nombre")}
                        placeholder="Nombre: correa, pelota..."
                        className={inputsEstilos}
                    />

                    <input
                        type="number"
                        {...register("stock")}
                        placeholder="Stock..."
                        className={inputsEstilos}
                    />

                    <input
                        type="text"
                        {...register("codigo")}
                        placeholder="Código..."
                        className={inputsEstilos}
                    />

                    <div className="container-price flex gap-4">
                        <input
                            type="number"
                            {...register("lista")}
                            placeholder="$ Lista"
                            className={inputsEstilos}
                        />
                        <input
                            type="number"
                            {...register("venta")}
                            placeholder="$ Venta"
                            className={inputsEstilos}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Guardar"
                        className={`${inputsEstilos} w-40 cursor-pointer `}
                    />
                </form>

            </main>
        </>
    );
}
