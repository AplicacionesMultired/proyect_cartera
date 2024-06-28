import { HeaderCompCartera } from '../components/HeaderCompCartera'
import { TableDatos } from '../components/TableDatos'
import { useCartera } from '../hooks/useCartera'

export const Home = () => {
  const { dataOrdenadaYFiltrada, handleChange, handleClickOrden, orden, setAbs, setEmpresa, vinculado } = useCartera()

  return (
    dataOrdenadaYFiltrada && (
      <section className='relative px-1'>
        <HeaderCompCartera data={dataOrdenadaYFiltrada} funEmpresa={setEmpresa} funABS={setAbs} funFilter={handleChange} vinculado={vinculado}/>
        <TableDatos data={dataOrdenadaYFiltrada} funSort={handleClickOrden} valueOrder={orden}/>
      </section>
    )
  )
}
