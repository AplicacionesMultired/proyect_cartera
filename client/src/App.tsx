function App() {
  return (
    <section>
      <nav className="bg-punch-100">
        <ul className="flex py-2 text-xl justify-around">
          <li>
            <a href="/" className="text-punch-950 font-semibold hover:text-punch-600">Inicio</a>
          </li>
          <li>
            <a href="/about" className="text-punch-950 font-semibold hover:text-punch-600">About</a>
          </li>
          <li>
            <a href="/contact" className="text-punch-950 font-semibold hover:text-punch-600">Contact</a>
          </li>
        </ul>
      </nav>
    </section>
  )
}

export default App
