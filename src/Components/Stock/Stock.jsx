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
            <Table stickyHeader>
                <TableHead sx={{ height: '10px' }}>
                    <TableRow>
                        <TableCell sx={styles.estiloHead}>
                            Nombre del Producto{" "}
                            <ImportExportIcon
                                className="ButtonOrden"
                                sx={styles.estilosIcons}
                                onClick={() => ordenarXNombre()}
                            />
                        </TableCell>
                        <TableCell align="right" sx={styles.estiloHead}>
                            Cantidad en Stock{" "}
                            <ImportExportIcon
                                className="ButtonOrden"
                                sx={styles.estilosIcons}
                                onClick={() => ordenarXStock()}
                            />
                        </TableCell>
                        <TableCell align="right" sx={styles.estiloHead}>
                            Fecha de Registro
                        </TableCell>
                        <TableCell align="right" sx={styles.estiloHead}>
                            Código del Producto
                        </TableCell>
                        <TableCell align="right" sx={styles.estiloHead}>
                            Precio de Lista
                        </TableCell>
                        <TableCell align="right" sx={styles.estiloHead}>
                            Precio de Venta
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
                                        <div className="flex gap-3 justify-end">
                                            <button onClick={() => handleOpenEdit(inv.id)}>
                                                <BorderColorIcon sx={{ color: styles.estilosIcons.color }} />
                                            </button>
                                            <button onClick={() => deleteItem(inv.id)}>
                                                <DeleteForeverIcon sx={{ color: styles.estilosIcons.color }} />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} align="center" sx={{ height: '100%', margin: 'auto', marginTop: '150px', marginLeft: '40%', position: 'absolute', }} >
                                {loading ? (
                                    <span className="flex flex-col items-center gap-3 font-medium text-l"><Loading /> Cargando...</span>
                                ) : (
                                    <span style={{ color: styles.estiloInfo.color }}>Inventario Vacío</span>
                                )}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

