import * as React from "react";
import Table from "@mui/material/Table";
import TableBody, { tableBodyClasses } from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./stock.css";
import { useState } from "react";

const Inventario = [
  { nombre: "Dog Food", stock: 100, codigo: 2001, lista: 50.0, venta: 45.0 },
  { nombre: "Cat Toy", stock: 150, codigo: 2002, lista: 10.0, venta: 8.0 },
  { nombre: "Bird Cage", stock: 50, codigo: 2003, lista: 120.0, venta: 110.0 },
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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={estiloHead}>Nombre</TableCell>
            <TableCell align="center" sx={estiloHead}>
              Stock
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
              <TableCell align="center">{inv.lista}</TableCell>
              <TableCell align="center">{inv.venta}</TableCell>
              <TableCell align="center">
                <button onClick={() => handleDelete(inv.nombre)}>delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
