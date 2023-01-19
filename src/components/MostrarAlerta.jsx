import Swal from 'sweetalert2'


const MostrarAlerta = (mensaje) => {
    return (
        Swal.fire({
            icon: 'error',
            title: 'Hubo un Error!',
            text: mensaje,
        })
    )
}

export default MostrarAlerta