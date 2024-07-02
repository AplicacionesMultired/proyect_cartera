import { HeaderCompCartera } from '../components/HeaderCompCartera'
import { TableDatos } from '../components/TableDatos'
import { useCartera } from '../hooks/useCartera'

export const Home = () => {
  const { data, setAbs, setEmpresa } = useCartera()

  return (
    data && (
      <section className='relative px-1'>
        <HeaderCompCartera data={data} funEmpresa={setEmpresa} funABS={setAbs} />
        <TableDatos data={data} />
      </section>
    )
  )
}
