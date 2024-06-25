import { Card } from '@tremor/react'
import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const BasesDetalle = () => {
  const { id } = useParams()

  console.log(id)

  useEffect(() => {
    // Llamada a la API
    axios.get(`http://172.20.1.110:3030/baseDetalle/${id}`)
      .then(response => { console.log(response.data) }).catch(error => { console.log(error) })
  }, [id])

  return (
    <section>
      <Card>
        1
      </Card>
      <Card>
        2
      </Card>
      <Card>
        3
      </Card>
    </section>
  )
}
