import React from 'react'
import { Link } from 'react-router-dom'

function Login(props) {
    return (
        <div className='container-fluid' style={{ margin: '0', backgroundImage: "url('images/pxfuel.jpg')", backgroundRepeat: 'no-repeat', width: '100%', height: '45rem', minHeight: 'calc(100vh - 257px)', display: 'flex', justifyContent: 'flex-end', padding: '10%', paddingRight: '4%' }}>
            <div style={{ width: '30rem', height: '15rem' }}>
                <center><h1>{props.text}</h1></center>
                <div style={{ paddingTop: '10%', display: 'flex', justifyContent: 'space-around', width: '30rem' }}>
                    <button type="button" className="btn btn-primary btn-lg" ><Link style={{ color: 'white', textDecoration: 'none' }} to={props.d}> For Doctors</Link></button>
                    <button type="button" className="btn btn-primary btn-lg"><Link style={{ color: 'white', textDecoration: 'none' }} to={props.p}>For Patients</Link></button>
                    <button type="button" className="btn btn-primary btn-lg"><Link style={{ color: 'white', textDecoration: 'none' }} to={props.l}>For Labs</Link></button>
                </div>
            </div>
        </div>
    )
}

export default Login