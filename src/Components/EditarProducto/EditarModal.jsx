import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import 'animate.css';
import useEditModalStyles from "../customHooksCss/EditCss/useEditCss";


export default function EditarModal({ handleCloseedit, addEditcion }) {
    const { register, handleSubmit } = useForm();
    const styles = useEditModalStyles(); // Usa el hook para obtener los estilos

    return (
        <>
            <main className={styles.formContainer}>
                <form onSubmit={handleSubmit(addEditcion)} className={`${styles.formStyles} ${styles.modalEstilos} gap-8 animate__animated   animate__fadeInUp shadow-[0px_-4px_5px_0px_rgba(0,0,0,0.75)]`}>
                    <button type="button" onClick={handleCloseedit} className=" absolute right-10 m-auto  max-2xl:right-4  max-2xl:top-3">
                        <CloseIcon />
                    </button>

                    <h2 className="text-center text-2xl">Editar Producto</h2>

                    <input
                        type="text"
                        {...register("nombre")}
                        placeholder="Nombre: correa, pelota..."
                        className={styles.inputsEstilos}
                    />

                    <input
                        type="number"
                        {...register("stock")}
                        placeholder="Stock..."
                        className={styles.inputsEstilos}
                    />

                    <input
                        type="text"
                        {...register("codigo")}
                        placeholder="Código..."
                        className={styles.inputsEstilos}
                    />

                    <div className="container-price flex gap-4">
                        <input
                            type="number"
                            {...register("lista")}
                            placeholder="$ Lista"
                            className={styles.inputsEstilos}
                        />
                        <input
                            type="number"
                            {...register("venta")}
                            placeholder="$ Venta"
                            className={styles.inputsEstilos}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Guardar"
                        className={`${styles.buttonGuardar} w-40 cursor-pointer `}
                    />
                </form>
            </main>
        </>
    );
}
