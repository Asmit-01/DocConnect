import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Footer(props) {
    const p = JSON.parse(localStorage.getItem('pat'))
    const d = JSON.parse(localStorage.getItem('doc'))
    let pat = false
    let doc = false

    useEffect(() => {
        if (p != null) pat = true;
        if (d != null) doc = true;
    }, [props]);

    return (
        <div style={{ backgroundColor: '#343a40', width: '100%', color: 'white', position: 'relative', bottom: '0' }}>
            <div className='container-fluid d-flex flex-row '>
                <div className='container my-5'>
                    <h3>DocConnect</h3>
                    <Link style={{ color: 'white', textDecoration: 'none' }} to='https://www.instagram.com/asmit_2002/' target='blank'><i className="bi bi-instagram mx-2"></i></Link>
                    <Link style={{ color: 'white', textDecoration: 'none' }} to='/'><i className="bi bi-whatsapp mx-2"></i></Link>
                    <Link style={{ color: 'white', textDecoration: 'none' }} to='https://twitter.com/asmitk2002' target='blank'><i className="bi bi-twitter mx-2"></i></Link>
                    <Link style={{ color: 'white', textDecoration: 'none' }} to='https://www.facebook.com/profile.php?id=100057989546230' target='blank'><i className="bi bi-facebook mx-2"></i></Link>
                    <Link style={{ color: 'white', textDecoration: 'none' }} to='https://www.linkedin.com/in/asmit-kumar-panika-b98856226/' target='blank'><i className="bi bi-linkedin mx-2"></i></Link>
                </div>

                <div className='container my-3' >
                    <h5>For Doctors</h5>
                    <p className='my-0'><Link to={(!pat && !doc) ? '/dregister' : '/'} style={{ color: 'white', textDecoration: 'none' }}>Register</Link></p>
                    <p><Link to={(!pat && !doc) ? '/dlogin' : '/'} style={{ color: 'white', textDecoration: 'none' }} >Login</Link></p>
                </div>

                <div className='container my-3' >
                    <h5>For Patients</h5>
                    <p className='my-0'><Link to={(!pat && !doc) ? '/pregister' : '/'} style={{ color: 'white', textDecoration: 'none' }}>Register</Link></p>
                    <p className='my-0'><Link to={(!pat && !doc) ? '/plogin' : '/'} style={{ color: 'white', textDecoration: 'none' }} >Login</Link></p>
                    <p className='my-0'><Link to={(props.loggedin === 1) ? '/dsearch' : '/'} style={{ color: 'white', textDecoration: 'none' }}>Search for Doctors</Link></p>
                    <p><Link to='/testlist' style={{ color: 'white', textDecoration: 'none' }} >Book Diagnostics Tests</Link></p>
                </div>

                <div className='container my-3' >
                    <h5>More</h5>
                    <p className='my-0' ><Link to='/help' style={{ color: 'white', textDecoration: 'none' }}>Help</Link></p>
                    <p className='my-0' ><Link to='/' style={{ color: 'white', textDecoration: 'none' }}>Privacy Policy</Link></p>
                    <p ><Link to='/' style={{ color: 'white', textDecoration: 'none' }}>Terms and Conditions</Link></p>
                </div>
            </div>
            <center>Copyright © 2023, DocConnect. All rights reserved.</center>
        </div>
    )
}

export default Footer 