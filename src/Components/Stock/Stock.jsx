import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Loading from "./loaders/Loading";
import { useContext } from "react";
import { InventarioContext } from "../Context/StockContext";
import useStockStyles from "../customHooksCss/StockCss/useStockCss";

export default function Stock({ handleOpenEdit }) {
    const { ordenarXNombre, ordenarXStock, deleteItem, inventario, loading } = useContext(InventarioContext);
    const styles = useStockStyles(); // hook para obtener los estilos

    return (
        <TableContainer component={Paper} sx={styles.tableContainer} className="custom-scrollbar">
            <Table stickyHeader sx={styles.estiloTable}>
                <TableHead sx={{ height: '10px' }}>
                    <TableRow sx={styles.prevRow}>
                        <TableCell sx={styles.estiloHead} >
                            Nombre{" "}
                            <ImportExportIcon
                                className="ButtonOrden"
                                sx={styles.estilosIcons}
                                onClick={() => ordenarXNombre()}
                            />
                        </TableCell>
                        <TableCell align="right" sx={styles.estiloHead} >
                            Stock{" "}
                            <ImportExportIcon
                                className="ButtonOrden"
                                sx={styles.estilosIcons}
                                onClick={() => ordenarXStock()}

                            />
                        </TableCell>
                        <TableCell align="right" sx={styles.estiloHead}>
                            Fecha
                        </TableCell>
                        <TableCell align="right" sx={styles.estiloHead}>
                            Producto
                        </TableCell>
                        <TableCell align="right" sx={styles.estiloHead}>
                            Lista
                        </TableCell>
                        <TableCell align="right" sx={styles.estiloHead}>
                            Venta
                        </TableCell>
                        <TableCell align="right" sx={styles.estiloHead}>
                            Acciones
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody sx={styles.tableBody}>
                    {inventario.length > 0 ? (
                        inventario.map((inv) => {
                            const fechaDate = new Date(inv.fecha);
                            const anio = fechaDate.getFullYear();
                            const mes = fechaDate.getMonth() + 1;
                            const dia = fechaDate.getDate() + 1;

                            return (
                                <TableRow key={inv.id} sx={styles.estiloRow}>
                                    <TableCell component="th" scope="row" sx={styles.estiloInfo}>
                                        {inv.nombre}
                                    </TableCell>
                                    <TableCell align="right" sx={styles.estiloInfo}>
                                        {inv.stock}
                                    </TableCell>
                                    <TableCell align="right" sx={styles.estiloInfo}>
                                        {`${dia}/${mes}/${anio}`}
                                    </TableCell>

                                    <TableCell align="right" sx={styles.estiloInfo}>
                                        {inv.codigo}
                                    </TableCell>
                                    <TableCell align="right" sx={styles.estiloInfo}>
                                        $ {new Intl.NumberFormat("es-AR").format(inv.lista)}
                                    </TableCell>
                                    <TableCell align="right" sx={styles.estiloInfo}>
                                        $ {new Intl.NumberFormat("es-AR").format(inv.venta)}
                                    </TableCell>
                                    <TableCell align="right" sx={styles.estiloInfo}>
                                        <div className="flex gap-4 justify-end pr-1">
                                            <button onClick={() => handleOpenEdit(inv.id)}>
                                                <BorderColorIcon sx={styles.estiloDeletEditar} />
                                            </button>
                                            <button onClick={() => deleteItem(inv.id)}>
                                                <DeleteForeverIcon sx={styles.estiloDeletEditar} />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow >
                            <TableCell colSpan={7} sx={{ border: 'none' }}>

                                {loading ? (
                                    <span className="flex flex-col justify-center items-center h-96">
                                        <Loading /> Cargando...
                                    </span>
                                ) : (
                                    <span
                                        style={{ color: styles.estiloInfo.color }}
                                        className="text-2xl flex flex-col items-center text-center font-medium text-l"
                                    >
                                        Inventario Vacío
                                    </span>
                                )}


                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer >
    );
}
