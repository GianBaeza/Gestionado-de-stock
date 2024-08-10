import "../AgregarProducto/agregarProducto.css";
export default function AgregarProducto({ closeModal }) {
  return (
    <div className="container-form">
      <div className="form">
        <form action="post">
          <button onClick={closeModal}>X</button>
          <h2>Agregar nuevo producto</h2>
          <label htmlFor="nombre">Nombre</label>
          <input type="text" name="nombre" placeholder="producto..." />
          <label htmlFor="stock">Stock</label>
          <input type="number" name="stock" placeholder="stock..." />
          <label htmlFor="codigo">Codigo</label>
          <input type="text" name="codigo" placeholder="codigo..." />
          <label htmlFor="number">Precio de Lista</label>
          <input type="text" name="nombre" placeholder="$" />
          <label htmlFor="number">Precio de Venta</label>
          <input type="text" name="nombre" placeholder="$" />
          <input type="submit" value="Agregar" className="btn-agregar" />
        </form>
      </div>
    </div>
  );
}
