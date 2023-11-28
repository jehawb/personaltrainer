// import './App.css'
import { Button } from "@mui/material";

import { Link, Outlet } from "react-router-dom";

export default function App() {

    return (
        <>
            <div className="App">
                <nav>
                    <Link to={"/"}><Button>Home</Button></Link>
                    <Link to={"/trainings"}><Button>Trainings</Button></Link>
                    <Link to={"/customers"}><Button>Customers</Button></Link>
                    <Link to={"/calendar"}><Button>Calendar</Button></Link>
                    <Link to={"/statistics"}><Button>Statistics</Button></Link>
                </nav>
                <Outlet />
            </div>
        </>
    )
}