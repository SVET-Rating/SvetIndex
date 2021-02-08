import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


export default function Navbar() {
    return (
        
            <div>
                <nav>
                    <div><Link to="/">HOME</Link></div>
                    <div><Link to="/investments">INVESTMENTS</Link></div>
                    <div><Link to="/dashboards">MY DASHBOARD</Link></div>
                    <div><Link to="/oracules">ORACULES</Link></div>
                    <div><Link to="/experts">EXPERTS</Link></div>
                </nav>
            </div>
    )
}
