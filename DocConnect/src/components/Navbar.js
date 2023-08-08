import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar(props) {

    const [pat, setPat] = useState(false)
    const [doc, setDoc] = useState(false)
    const [lab, setLab] = useState(false)
    const p = JSON.parse(localStorage.getItem('pat'))
    const d = JSON.parse(localStorage.getItem('doc'))
    const l = JSON.parse(localStorage.getItem('lab'))

    useEffect(() => {

        // console.log(props.loggedin)
        if (p != null) setPat(true);
        if (d != null) setDoc(true);
        if (l != null) setLab(true);
    }, [props])

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid" >
                <Link className="navbar-brand" to="/">DocConnect</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse container-fluid" id="navbarNav" style={{ justifyContent: 'space-between' }}>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {(doc || pat || lab) ? <></> : <Link className="nav-link active" aria-current="page" to="/">Home</Link>}
                        </li>
                        <li className="nav-item">
                            {(pat) ? <Link className="nav-link" to="/phome">Home</Link> : <></>}
                        </li>
                        <li className="nav-item">
                            {(pat) ? <Link className="nav-link" to="/dsearch">Search Doctor</Link> : <></>}
                        </li>
                        <li className="nav-item">
                            {(pat) ? <Link className="nav-link" to="/testlist">Lab Tests</Link> : <></>}
                        </li>
                        <li className="nav-item">
                            {(pat) ? <Link className="nav-link" to="/pupdate">Update Details</Link> : <></>}
                        </li>
                        <li className="nav-item">
                            {(pat) ? <Link className="nav-link" to="/pappointlist">Appointments</Link> : <></>}
                        </li>
                        <li className="nav-item">
                            {(pat) ? <Link className="nav-link" to="/" onClick={() => {
                                setPat(false)
                                props.setloggedin(0)
                                localStorage.clear();
                            }}>Logout</Link> : <></>}
                        </li>

                        <li className="nav-item">
                            {(doc) ? <Link className="nav-link" to="/dhome">Home</Link> : <></>}
                        </li>
                        <li className="nav-item">
                            {(doc) ? <Link className="nav-link" to="/dappointlist">Appointments</Link> : <></>}
                        </li>
                        <li className="nav-item">
                            {(doc) ? <Link className="nav-link" to="/dupdate">Update Details</Link> : <></>}
                        </li>
                        <li className="nav-item">
                            {(doc) ? <Link className="nav-link" to="/" onClick={() => {
                                setDoc(false)
                                props.setloggedin(0)
                                localStorage.clear();
                            }}>Logout</Link> : <></>}
                        </li>


                        <li className="nav-item">
                            {(lab) ? <Link className="nav-link" to="/labhome">Home</Link> : <></>}
                        </li>
                        <li className="nav-item">
                            {(lab) ? <Link className="nav-link" to="/alltests">All Test Bookings</Link> : <></>}
                        </li>
                        <li className="nav-item">
                            {(lab) ? <Link className="nav-link" to="/selectedtests">Selected Tests</Link> : <></>}
                        </li>
                        <li className="nav-item">
                            {(lab) ? <Link className="nav-link" to="/" onClick={() => {
                                setLab(false)
                                props.setloggedin(0)
                                localStorage.clear();
                            }}>Logout</Link> : <></>}
                        </li>

                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {(doc || pat || lab) ? <></> : <Link className="nav-link active" aria-current="page" to="/login">Login</Link>}
                        </li>
                        <li className="nav-item">
                            {(doc || pat || lab) ? <></> : <Link className="nav-link active" aria-current="page" to="/Register">Register</Link>}
                        </li>
                        <li className="nav-item">
                            {(doc) ? <span style={{ color: 'white' }}>{'Welcome, Dr. ' + d.name}</span> : <></>}
                        </li>
                        <li className="nav-item">
                            {(pat) ? <span style={{ color: 'white' }}>{'Welcome, ' + p.name}</span> : <></>}
                        </li>
                        <li className="nav-item">
                            {(lab) ? <span style={{ color: 'white' }}>{'Welcome, ' + l.name}</span> : <></>}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar