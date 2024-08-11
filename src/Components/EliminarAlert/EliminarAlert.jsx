import Swal from "sweetalert2";

export default function EliminarAlert({ onConfirm, onCancel }) {
  return Swal.fire({
    title: "¿Estás seguro?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    denyButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      onCancel();
    }
  });
}
