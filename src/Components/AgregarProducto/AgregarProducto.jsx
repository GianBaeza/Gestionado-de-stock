import { useForm } from "react-hook-form";
import "../AgregarProducto/agregarProducto.css";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState } from "react";
import { InventarioContext } from "../Context/StockContext";


export default function AgregarProducto({ closeModal }) {
  const { register, handleSubmit,formState: { errors }} = useForm();
  
  const { addNuevoProducto } = useContext(InventarioContext);

  const AddForm = (data) => {
     const nuevoProducto = {
            id: Date.now(), // Genera un ID único basado en el tiempo actual
            nombre: data.nombre,
            stock: Number(data.stock),
            codigo: data.codigo,
            lista: parseFloat(data.lista), // Asegúrate de convertir a número
            venta: parseFloat(data.venta),
          }
            addNuevoProducto(nuevoProducto);
            closeModal();
        
    }
     



  return (
    <div className="container-form">
      <div className="form">
        <form action="post" onSubmit={handleSubmit(AddForm)}>
          <button onClick={closeModal} className="close-ModalAgregar">
            <CloseIcon />
          </button>
          <h2>Agregar nuevo producto</h2>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            {...register("nombre",{ required: true })}
            placeholder="producto..."
            
          />
          {errors.nombre &&  <span className={errors.nombre ? "errorOn" : null}>Ingrese un nombre valido</span>}
          <label htmlFor="stock"></label>
          <input type="number" {...register("stock",{ required: true })} placeholder="stock..." />
          {errors.stock &&  <span className={errors.stock ? "errorOn" : null}>Ingrese un stock valido</span>}

          <label htmlFor="codigo">Codigo</label>
          <input type="text" {...register("codigo",{ required: true })} placeholder="codigo..." />
          {errors.codigo &&  <span className={errors.codigo ? "errorOn" : null}>Ingrese un codigo valido</span>}
          <div className="contianer-price">
            <label htmlFor="lista" className="label-price">
              Lista
              <input
                type="number"
                {...register("lista",{ required: true })}
                placeholder="$"
                className="input-price"
              />
             
            </label>

            <label htmlFor="venta" className="label-price">
              Venta
              <input
                type="number"
                {...register("venta",{ required: true })}
                placeholder="$"
                className="input-price"
              />
            </label>
            
          </div>
          {errors.venta && errors.venta &&  <span className={errors.venta ? "errorOn" : null}>Ingrese un precio</span>}
          <input type="submit" value="Agregar" className="btn-agregar" />
        </form>
      </div>
    </div>
  );
}
