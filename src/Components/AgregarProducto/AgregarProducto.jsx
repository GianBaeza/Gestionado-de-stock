import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import { InventarioContext } from "../Context/StockContext";
import useAgregarProductoStyles from "../customHooksCss/AgregarProducCss/useAgregarCss";


export default function AgregarProducto({ closeModal }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { addNuevoProducto } = useContext(InventarioContext);

    const styles = useAgregarProductoStyles()
    const AddForm = (data) => {
        addNuevoProducto(data);
        closeModal();
    };

    return (
        <div className={styles.containerModal}>
            <div className={`p-6 rounded-lg shadow-lg w-3/12 max-2xl:w-4/12  max-lg:w-7/12  min-ms:w-6/12 flex flex-col gap-8 ${styles.modalEstilos}`}>
                <button onClick={closeModal} className={styles.buttonClose}>
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
                                placeholder="Correa... Pelota..."
                                className={styles.inputsEstilos}
                            />
                            {errors.nombre && <span className="text-red-500 text-sm">Ingrese un nombre válido</span>}
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="codigo" className="text-sm font-medium">Código</label>
                            <input
                                type="text"
                                {...register("codigo", { required: true })}
                                placeholder="PM41SD..."
                                className={styles.inputsEstilos}
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
                                className={styles.inputsEstilos}
                            />
                            {errors.fecha && <span className="text-red-500 text-sm">{errors.fecha.message}</span>}
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="stock" className="text-sm font-medium">Stock</label>
                            <input
                                type="number"
                                {...register("stock", { required: true })}
                                placeholder="44..."
                                className={styles.inputsEstilos}
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
                                placeholder="$ 200..."
                                className={styles.inputsEstilos}
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="venta" className="text-sm font-medium">Venta</label>
                            <input
                                type="number"
                                {...register("venta", { required: true })}
                                placeholder="$ 400..."
                                className={styles.inputsEstilos}
                            />
                        </div>
                    </div>
                    {errors.venta && <span className="text-red-500 text-sm">Ingrese un precio válido</span>}

                    <input
                        type="submit"
                        value="Agregar"
                        className={`${styles.submitButton} ${styles.buttonGuardar}`}
                    />
                </form>
            </div>
        </div>
    );
}
