import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { HOST } from '../App'

function RecaudoDetail () {
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    axios.get(`${HOST}/recaudo?id=29583747`)
      .then(res => console.log(res.data))
      .catch(error => console.error(error))
  }, [id])

  return (
    <div>
      <h1>Recaudo Detail</h1>
      <p>Recaudo Detail id: {id}</p>
    </div>
  )
}

export default RecaudoDetail
