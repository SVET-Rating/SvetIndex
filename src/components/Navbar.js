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
                    <div><Link to="/investments">YOUR ACCOUNT</Link></div>
                    <div><Link to="/dashboards">SVET INDEXES</Link></div>
                    <div><Link to="/oracules">TOP PROJECTS</Link></div>
                    <div><Link to="/experts">ANALYSIS</Link></div>
                    <div><Link to="#">ON / OFF RAMP</Link></div>
                </nav>
            </div>
    )
    /**                    <div><Link to="/">HOME</Link></div>
 */
}
