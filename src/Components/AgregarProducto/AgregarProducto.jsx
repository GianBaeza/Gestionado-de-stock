import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import { InventarioContext } from "../Context/StockContext";
import { ThemeContextCustom } from "../Context/ThemeContext";

export default function AgregarProducto({ closeModal }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { addNuevoProducto } = useContext(InventarioContext);
    const { theme } = useContext(ThemeContextCustom);

    const AddForm = (data) => {
        addNuevoProducto(data);
        closeModal();
    };

    const inputsEstilos = `w-full p-2 border border-gray-300 rounded-lg shadow-inner text-stone-800 ${theme === 'dark' ? 'bg-slate-200 text-stone-300 border-gray-600' : 'bg-gray-200'
        }`;

    const modalEstilos = theme === 'dark' ? 'bg-slate-800 text-stone-100 ' : 'bg-slate-50 text-stone-800';

    return (
        <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50 h-full w-full'>
            <div className={`p-6 rounded-lg shadow-lg w-96 flex flex-col gap-4 ${modalEstilos}`}>
                <button onClick={closeModal} className="self-end mb-4">
                    <CloseIcon />
                </button>
                <form onSubmit={handleSubmit(AddForm)} className="flex flex-col gap-4">
                    <h2 className="text-2xl text-center mb-4">Agregar nuevo producto</h2>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label htmlFor="nombre" className="text-sm font-medium">Nombre</label>
                            <input
                                type="text"
                                {...register("nombre", { required: true })}
                                placeholder="Producto..."
                                className={inputsEstilos}
                            />
                            {errors.nombre && <span className="text-red-500 text-sm">Ingrese un nombre válido</span>}
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="codigo" className="text-sm font-medium">Código</label>
                            <input
                                type="text"
                                {...register("codigo", { required: true })}
                                placeholder="Código..."
                                className={inputsEstilos}
                            />
                            {errors.codigo && <span className="text-red-500 text-sm">Ingrese un código válido</span>}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label htmlFor="fecha" className="text-sm font-medium">Fecha</label>
                            <input
                                type="date"
                                {...register("fecha", { required: 'La fecha es obligatoria' })}
                                className={inputsEstilos}
                            />
                            {errors.fecha && <span className="text-red-500 text-sm">{errors.fecha.message}</span>}
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="stock" className="text-sm font-medium">Stock</label>
                            <input
                                type="number"
                                {...register("stock", { required: true })}
                                placeholder="Stock..."
                                className={inputsEstilos}
                            />
                            {errors.stock && <span className="text-red-500 text-sm">Ingrese un stock válido</span>}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label htmlFor="lista" className="text-sm font-medium">Lista</label>
                            <input
                                type="number"
                                {...register("lista", { required: true })}
                                placeholder="$"
                                className={inputsEstilos}
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="venta" className="text-sm font-medium">Venta</label>
                            <input
                                type="number"
                                {...register("venta", { required: true })}
                                placeholder="$"
                                className={inputsEstilos}
                            />
                        </div>
                    </div>
                    {errors.venta && <span className="text-red-500 text-sm">Ingrese un precio válido</span>}

                    <input
                        type="submit"
                        value="Agregar"
                        className="mt-4 p-2 bg-blue-100 text-slate-900 rounded hover:bg-slate-500 cursor-pointer "
                    />
                </form>
            </div>
        </div>
    );
}
