import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import "../EditarProducto/editarModal.css";
import 'animate.css';
export default function EditarModal({ handleCloseedit, addEditcion, estiloAnimacion }) {
    const { register, handleSubmit } = useForm();

    return (
        <>
            <main className={`container-ModalEdit ${estiloAnimacion}`} >
                <div className="form">
                    <form onSubmit={handleSubmit(addEditcion)}>
                        <button type="button" onClick={handleCloseedit} className="close-Modal">
                            <CloseIcon />
                        </button>

                        <h2>Editar Producto</h2>

                        <input
                            type="text"
                            {...register("nombre")}
                            placeholder="Nombre: correa, pelota..."
                        />

                        <input
                            type="number"
                            {...register("stock")}
                            placeholder="Stock..."
                        />

                        <input
                            type="text"
                            {...register("codigo")}
                            placeholder="Código..."
                        />

                        <div className="container-price">
                            <input
                                type="number"
                                {...register("lista")}
                                placeholder="$ Lista"
                                className="price-editar"
                            />
                            <input
                                type="number"
                                {...register("venta")}
                                placeholder="$ Venta"
                                className="price-editar"
                            />
                        </div>

                        <input
                            type="submit"
                            value="Guardar"
                            className="btn-agregar"
                        />
                    </form>
                </div>
            </main>
        </>
    );
}
