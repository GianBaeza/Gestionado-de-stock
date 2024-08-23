import Swal from "sweetalert2";
import './eliminarAler.css'; // Importa los estilos

export default function EliminarAlert({ onConfirm, title, theme }) {

    const customClass = theme === 'dark' ? 'dark-popup' : 'custom-popup';

    return Swal.fire({
        title: title,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        customClass: {
            popup: customClass,
            title: theme === 'dark' ? 'dark-title' : 'custom-title',
            confirmButton: theme === 'dark' ? 'dark-confirm-button' : 'custom-confirm-button',
            cancelButton: theme === 'dark' ? 'dark-cancel-button' : 'custom-cancel-button',
            icon: theme === 'dark' ? 'dark-icon' : 'custom-icon',
            actions: theme === 'dark' ? 'dark-actions' : 'custom-actions',
            footer: theme === 'dark' ? 'dark-footer' : 'custom-footer',
            timerProgressBar: theme === 'dark' ? 'dark-timer-progress-bar' : 'custom-timer-progress-bar',
        }
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm();
        }
    });
}
