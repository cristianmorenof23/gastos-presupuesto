import { useState, useEffect } from 'react'
import Header from './components/Header'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { generarId } from './helpers'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import Filtros from './components/Filtros'




function App() {

    const [gastos, setGastos] = useState(
        localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
    )

    const [presupuesto, setPresupuesto] = useState(
        Number(localStorage.getItem('presupuesto')) ?? 0
    )
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

    const [modal, setModal] = useState(false)
    const [animarModal, setAnimarModal] = useState(false)

    const [gastoEditar, setGastoEditar] = useState({})

    // State para los filtros
    const [filtro, setFiltro] = useState('')
    const [gastosFiltrados, setGastosFiltrados] = useState([])

    // useEfect para escuchar los cambios realizados en  filtro
    useEffect(() => {
        if (filtro) {
            // Filtrar gastos por categoria
            const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)

            setGastosFiltrados(gastosFiltrados)
        }
    }, [filtro])

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setModal(true)

            setTimeout(() => {
                setAnimarModal(true)
            }, 500);
        }
    }, [gastoEditar]);

    useEffect(() => {
        localStorage.setItem('presupuesto', presupuesto ?? 0)
    }, [presupuesto])


    useEffect(() => {
        localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
    }, [gastos])

    useEffect(() => {
        const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
        if (presupuestoLS > 0) {
            setIsValidPresupuesto(true)
        }
    }, [])

    const handleNuevoGasto = () => {
        setModal(true)
        setGastoEditar({})

        setTimeout(() => {
            setAnimarModal(true)
        }, 500);
    }

    const guardarGasto = gasto => {

        if (gasto.id) {
            // Actualizar
            const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
            setGastos(gastosActualizados)
            setGastoEditar({})
        } else {
            //Nuevo Gasto
            gasto.id = generarId()
            gasto.fecha = Date.now()
            setGastos([...gastos, gasto])
        }


        setAnimarModal(false)
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const eliminarGasto = (id) => {
        const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
        setGastos(gastosActualizados)
    }


    return (

        <div className={modal ? 'fijar' : ''}>
            <Header
                gastos={gastos}
                setGastos={setGastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            ></Header>

            {isValidPresupuesto && (
                <>
                    <main>
                        <Filtros
                        filter={filtro} setFiltro={setFiltro}></Filtros>
                        <ListadoGastos gastos={gastos} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto} filtro={filtro} gastosFiltrados={gastosFiltrados}></ListadoGastos>
                    </main>
                    <div className='nuevo-gasto'>
                        <img src={IconoNuevoGasto} alt='icono-nuevogasto' onClick={handleNuevoGasto}></img>
                    </div>
                </>

            )}

            {modal && <Modal setModal={setModal} animarModal={animarModal} setAnimarModal={setAnimarModal} guardarGasto={guardarGasto} gastoEditar={gastoEditar} setGastoEditar={setGastoEditar}></Modal>}


        </div>



    )
}

export default App
