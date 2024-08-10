import { useForm } from "react-hook-form";
import "../AgregarProducto/agregarProducto.css";
export default function AgregarProducto({ closeModal }) {
  const { register, handleSubmit } = useForm();

  const AddForm = (data) => {
    console.log(data);
    closeModal();
  };
  return (
    <div className="container-form" onSubmit={handleSubmit(AddForm)}>
      <div className="form">
        <form action="post">
          <button onClick={closeModal}>X</button>
          <h2>Agregar nuevo producto</h2>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            {...register("nombre")}
            placeholder="producto..."
          />
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            {...register("register")}
            placeholder="stock..."
          />
          <label htmlFor="codigo">Codigo</label>
          <input type="text" {...register("codigo")} placeholder="codigo..." />
          <label htmlFor="precioLista">Precio de Lista</label>
          <input type="text" {...register("precioLista")} placeholder="$" />
          <label htmlFor="precioVenta">Precio de Venta</label>
          <input type="text" {...register("precioVenta")} placeholder="$" />
          <input type="submit" value="Agregar" className="btn-agregar" />
        </form>
      </div>
    </div>
  );
}
