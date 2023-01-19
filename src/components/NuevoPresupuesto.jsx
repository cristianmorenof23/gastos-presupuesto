import React from 'react'
import MostrarAlerta from './MostrarAlerta'


const NuevoPresupuesto = ({ presupuesto, setPresupuesto,setIsValidPresupuesto }) => {

    const handlePresupuesto = (e) => {
        e.preventDefault()

        if (!presupuesto || presupuesto < 0) {
            MostrarAlerta('El presupuesto no es validó')
            return
        }
        setIsValidPresupuesto(true)

    }


    return (
        <div className='contenedor-presupuesto contenedor sombra'>
            <form onSubmit={handlePresupuesto} className='formulario'>
                <div className='campo'>
                    <label>Definir Presupuesto</label>
                    <input
                        className='nuevo-presupuesto'
                        type="number"
                        placeholder='Añade tu Presupuesto'
                        value={presupuesto}
                        onChange={(e) => setPresupuesto(Number(e.target.value))}
                    >
                    </input>
                    <input type="submit" value="Añadir"></input>
                </div>
            </form>
        </div>
    )
}

export default NuevoPresupuesto