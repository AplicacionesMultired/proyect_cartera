import axios from "axios"
import { useEffect, useState } from "react"
import { CarteraI } from "./types/cartera"
import { TableCartera } from "./components/TableCartera"

function App() {
  // Estado para los datos originales
  const [originalData, setOriginalData] = useState<CarteraI[]>([])
  // Estado para los datos filtrados
  const [data, setData] = useState<CarteraI[]>([])

  useEffect(() => {
    axios.get('http://172.20.1.110:3000/cartera')
      .then(res => {
        // Actualiza ambos estados con los datos de la API
        setOriginalData(res.data)
        setData(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const handleChange = (ev: string) => {
    // Filtra desde los datos originales
    if (ev === '0') {
      setData(originalData)
      return
    }

    const dataFiltrada = originalData.filter(item => item.EMPRESA === ev)
    // Actualiza el estado de los datos filtrados
    setData(dataFiltrada)
  }

  return (
    <section className="">
      {/* <nav className="bg-white border rounded-md border-punch-500 m-1">
        <ul className="flex py-2 text-xl justify-around">
          <li>
            <a href="/" className="text-punch-800 font-semibold hover:text-punch-600">Inicio</a>
          </li>
          <li>
            <a href="/about" className="text-punch-800 font-semibold hover:text-punch-600">About</a>
          </li>
        </ul>
      </nav> */}
      <main className="m-1">
        {
          data && ( <TableCartera data={data} fun={handleChange}/> )
        }
      </main>
    </section>
  )
}

export default App