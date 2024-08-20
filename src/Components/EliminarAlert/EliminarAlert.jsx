import Swal from "sweetalert2";

export default function EliminarAlert({ onConfirm, title }) {
    return Swal.fire({
        title: title,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        denyButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm();
        }
    });
}
