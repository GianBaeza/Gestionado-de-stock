import { useForm } from "react-hook-form"
import CloseIcon from "@mui/icons-material/Close";
import "../EditarProducto/editarModal.css"
import { useContext } from "react";
import { InventarioContext } from "../Context/StockContext";


export default function EditarModal({handleCloseedit,itemId}) {

    const {register, handleSubmit} = useForm()
    const { editarItem} = useContext(InventarioContext)

    const addEditcion = (data)=>{

            if(data){
             editarItem(itemId, data)
            }
            handleCloseedit()

    } 


  return (
    <>
     <main className="container-ModalEdit">
     <div className="form">
     <form action="post" onSubmit={handleSubmit(addEditcion)}>
        <button onClick={handleCloseedit} className="close-Modal"><CloseIcon /></button>
    
      <h2>Editar Producto</h2>
      
      <input
        type="text"
        {...register("nombre")}
        placeholder="producto..."
      />
  
      <input type="number" {...register("stock")} placeholder="stock..." />

      <input type="text" {...register("codigo")} placeholder="codigo..." />
      <div className="contianer-price">
       
          <input
            type="number"
            {...register("lista")}
            placeholder="$"
            className="price-editar"
          />
          <input
            type="number"
            {...register("venta")}
            placeholder="$"
            className="price-editar"
           
          />
      
      </div>
      <input type="submit" value="Agregar" className="btn-agregar" />
    </form>
     </div>
     </main>
  
    </>

  )
}
