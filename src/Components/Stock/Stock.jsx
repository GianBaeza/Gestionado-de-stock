import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./stock.css";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Loading from "./loaders/Loading";
import { useContext } from "react";
import { InventarioContext } from "../Context/StockContext";

//Estilos del inventario
const estiloHead = { fontSize: 20 };
const estiloInfo = { fontSize: 15 };

export default function Stock({ handleOpenEdit }) {
    const { ordenarXNombre, ordenarXStock, deleteItem, inventario, loading } =
        useContext(InventarioContext);

    return (
        <section >
            <TableContainer
                component={Paper}
                sx={{
                    width: "80%",
                    margin: "auto",
                    height: "500px",
                    paddingLeft: '5px',
                    paddingRight: '5px',
                    paddingBottom: '5px',



                }}


            >
                <Table stickyHeader> {/* stickyHeader hace que permanezca visible mientras se hace scroll */}
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

                                    onClick={() => ordenarXNombre()}
                                />
                            </TableCell>
                            <TableCell align="right" sx={estiloHead}>
                                Stock{" "}
                                <ImportExportIcon
                                    className="ButtonOrden"
                                    sx={{ width: 20, height: 20, margin: "auto" }}
                                    onClick={() => ordenarXStock()}
                                />
                            </TableCell>
                            <TableCell align="right" sx={estiloHead}>
                                Código
                            </TableCell>
                            <TableCell align="right" sx={estiloHead}>
                                $ Lista
                            </TableCell>
                            <TableCell align="right" sx={estiloHead}>
                                $ Venta
                            </TableCell>
                            <TableCell align="right" sx={estiloHead}>
                                Acción
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody className="snap-x snap-mandatory" sx={{
                        borderRadius: "20px",
                        overflowY: "100px",
                        overflowX: 'auto',
                    }}>
                        {inventario.length > 0 ? (
                            inventario.map((inv) => (
                                <TableRow key={inv.id}>
                                    <TableCell component="th" scope="row" sx={estiloInfo}>
                                        {inv.nombre}
                                    </TableCell>
                                    <TableCell align="right" sx={estiloInfo}>
                                        {inv.stock}
                                    </TableCell>
                                    <TableCell align="right" sx={estiloInfo}>
                                        {inv.codigo}
                                    </TableCell>
                                    <TableCell align="right" sx={estiloInfo}>
                                        $ {new Intl.NumberFormat("es-AR").format(inv.lista)}
                                    </TableCell>
                                    <TableCell align="right" sx={estiloInfo}>
                                        $ {new Intl.NumberFormat("es-AR").format(inv.venta)}
                                    </TableCell>
                                    <TableCell align="right">
                                        <div className="button-container">
                                            <button
                                                className="acciones"
                                                onClick={() => handleOpenEdit(inv.id)}
                                            >
                                                <BorderColorIcon />
                                            </button>
                                            <button
                                                className="acciones"
                                                onClick={() => deleteItem(inv.id)}
                                            >
                                                <DeleteForeverIcon />
                                            </button>
                                        </div>
                                    </TableCell>

                                </TableRow>

                            ))
                        ) : (
                            <TableBody olSpan={6} align="center">

                                {loading ? (
                                    <span>
                                        <Loading />
                                    </span>
                                ) : (
                                    <span>Inventario Vacío</span>
                                )}

                            </TableBody>
                        )}
                    </TableBody>
                </Table>

            </TableContainer>
        </section>
    );
}
