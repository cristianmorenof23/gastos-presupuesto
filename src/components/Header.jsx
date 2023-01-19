import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'



const Header = ({ presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto, gastos, setGastos }) => {
    return (
        <header>
            <h1>Planificador de Gastos</h1>


            {isValidPresupuesto ? (
                <ControlPresupuesto
                    setGastos={setGastos}
                    gastos={gastos}
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                ></ControlPresupuesto>
            ) :
                <NuevoPresupuesto
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                ></NuevoPresupuesto>}

        </header>
    )
}

export default Header