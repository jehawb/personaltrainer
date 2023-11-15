// import './App.css'

import { Link, Outlet } from "react-router-dom";

export default function App() {

  return (
    <>
        <div className="App">
            <nav>
                <Link to={"/"}>Home</Link>
                <Link to={"/training"}>Training</Link>
                <Link to={"/customers"}>Customers</Link>
            </nav>
            <Outlet />
        </div>
    </>
  )
}