import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./stock.css";
import { useState } from "react";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const Inventario = [
  { nombre: "Dog Food", stock: 100, codigo: 2001, lista: 50.0, venta: 45.0 },
  { nombre: "Cat Toy", stock: 150, codigo: 2002, lista: 10.0, venta: 8.0 },
  { nombre: "Bird Cage", stock: 50, codigo: 2003, lista: 12000, venta: 110.0 },
  { nombre: "Fish Tank", stock: 30, codigo: 2004, lista: 200.0, venta: 180.0 },
  { nombre: "Rabbit Food", stock: 80, codigo: 2005, lista: 25.0, venta: 20.0 },
];

const estiloHead = { fontSize: 20 };
export default function Stock() {
  const [inventario, setInventario] = useState(Inventario);

  const handleDelete = (name) => {
    const itemDelete = inventario.filter((item) => item.nombre !== name);

    setInventario(itemDelete);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ width: "80%", margin: "auto", height: "auto" }}
    >
      <Table className="table-container">
        <TableHead>
          <TableRow>
            <TableCell sx={estiloHead}>
              Nombre{" "}
              <ImportExportIcon
                className="ButtonOrden"
                sx={{
                  width: 20,
                  height: 20,
                  margin: "auto",
                }}
              />
            </TableCell>
            <TableCell align="center" sx={estiloHead}>
              Stock{" "}
              <ImportExportIcon
                className="ButtonOrden"
                sx={{ width: 20, height: 20, margin: "auto" }}
              />
            </TableCell>
            <TableCell align="center" sx={estiloHead}>
              Codigo
            </TableCell>
            <TableCell align="center" sx={estiloHead}>
              $ Lista
            </TableCell>
            <TableCell align="center" sx={estiloHead}>
              $ Venta
            </TableCell>
            <TableCell align="center" sx={estiloHead}>
              Accion
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventario.map((inv) => (
            <TableRow key={inv.codigo}>
              <TableCell component="th" scope="row">
                {inv.nombre}
              </TableCell>
              <TableCell align="center">{inv.stock}</TableCell>
              <TableCell align="center">{inv.codigo}</TableCell>
              <TableCell align="center">
                $ {new Intl.NumberFormat("es-AR").format(inv.lista)}
              </TableCell>
              <TableCell align="center">
                {" "}
                $ {new Intl.NumberFormat("es-AR").format(inv.venta)}
              </TableCell>
              <TableCell align="center">
                <button className="acciones">
                  <BorderColorIcon />
                </button>
                <button
                  className="acciones"
                  onClick={() => handleDelete(inv.nombre)}
                >
                  <DeleteForeverIcon />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
