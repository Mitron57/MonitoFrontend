import { useEffect, useState } from 'react'
import './App.css'

const api = import.meta.env.VITE_API_URL
const period = import.meta.env.VITE_PERIOD * 1000

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchMachines = () => {
      fetch(`${api}/machines`)
      .then(response => response.json())
      .then(data => setData(data.machines))
      .catch(err => console.log("Error!", err))
    }
    fetchMachines()
    const intervalId = setInterval(fetchMachines, period)
    return () => clearInterval(intervalId)
  }, [])
  return <div className="container mt-4">
    <h2 className="mb-3">Docker containers</h2>
    <div className='table-responsive'>
    <table className="table table-bordered table-striped">
      <thead className="table-dark">
        <tr>
          <th>IP</th>
          <th>Ping time</th>
          <th>Last successful ping</th>
        </tr>
      </thead>
      <tbody>
        {data.map((machine) => (
          <tr key={machine.ip}>
            <td>{machine.ip}</td>
            <td>{`${machine.ping_time}s`}</td>
            <td>{new Date(machine.last_success).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  </div>
}

export default App
