import axios from "axios"
import { useEffect, useState } from "react"
import { CarteraI } from "./types/cartera"
import { TableUsageExample } from "./components/TableComponent"

function App() {

  const [data, setData] = useState<CarteraI[]>()

  useEffect(() => {
    axios.get('http://172.20.1.110:3000/cartera')
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <section className="w-screen h-[98vh]">
      <nav className="bg-white border rounded-md border-punch-500 m-1">
        <ul className="flex py-2 text-xl justify-around">
          <li>
            <a href="/" className="text-punch-800 font-semibold hover:text-punch-600">Inicio</a>
          </li>
          <li>
            <a href="/about" className="text-punch-800 font-semibold hover:text-punch-600">About</a>
          </li>
        </ul>
      </nav>
      <main className="m-1">
        {
          data && ( <TableUsageExample data={data}/> )
        }
      </main>
    </section>
  )
}

export default App
