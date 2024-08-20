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

const estiloHead = { fontSize: 20, fontFamily: 'myFont' };
const estiloInfo = { fontSize: 15, fontFamily: 'myFont' };

export default function Stock({ handleOpenEdit }) {
    const { ordenarXNombre, ordenarXStock, deleteItem, inventario, loading } =
        useContext(InventarioContext);

    return (
        <section>
            <TableContainer
                component={Paper}
                sx={{
                    width: "90%",
                    margin: "auto",
                    height: "700px",
                    paddingLeft: '5px',
                    paddingRight: '5px',
                    paddingBottom: '5px',
                    fontFamily: 'myFont',

                }}
            >
                <Table stickyHeader >
                    <TableHead sx={{ backgroundColor: '#b3dbc8' }}>
                        <TableRow>
                            <TableCell sx={estiloHead}>
                                Nombre{" "}
                                <ImportExportIcon
                                    className="ButtonOrden "
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

                    <TableBody
                        sx={{
                            borderRadius: "20px",
                            overflowY: "100px",
                            overflowX: 'auto',
                            fontFamily: 'myFont',
                        }}
                    >
                        {inventario.length > 0 ? (
                            inventario.map((inv) => {

                                return <TableRow key={inv.id} sx={{ backgroundColor: '#f9fad2', margin: 'auto', flexWrap: 'wrap', justifyContent: 'center' }}>
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
                            }


                            )
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    {loading ? (
                                        <Loading />
                                    ) : (
                                        <span>Inventario Vacío</span>
                                    )}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </section >
    );
}
