import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import Swal from 'sweetalert2'




const ControlPresupuesto = ({ presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto }) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)

        const totalDisponible = presupuesto - totalGastado

        // Calcular el porcentaje gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1500);

        setDisponible(totalDisponible)
        setGastado(totalGastado)
    }, [gastos])

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }
    // Funcion para limpiar la app
    const AlertaConfirmacion = () => {
        Swal.fire({
            title: 'Estas Seguro?',
            text: "No vas a poder revertirlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Borrado!',
                    'Se ha reseteado el registro',
                    'success',
                    setGastos([]),
                    setPresupuesto(0),
                    setIsValidPresupuesto(false)
                )
            }
        })
    }




    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <p>
                    <CircularProgressbar value={porcentaje} text={`${porcentaje}% Gastado`} styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                    })}>

                    </CircularProgressbar>
                </p>
            </div>
            <div className='contenido-presupuesto'>
                <button className='reset-app'
                    type='buttton'
                    onClick={AlertaConfirmacion}>
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado: </span> {formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto