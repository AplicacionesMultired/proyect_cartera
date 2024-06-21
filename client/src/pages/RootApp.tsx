import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"

export const RootApp = () => {
  return(
    <>
      <nav className="border-t-4 mb-1 border-rose-500 rounded-lg bg-white dark:bg-dark-tremor-brand-faint">
        <NavBar />
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}