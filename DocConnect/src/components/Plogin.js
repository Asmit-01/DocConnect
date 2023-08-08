import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Plogin(props) {
    const [paswd, setPaswd] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        const pat = localStorage.getItem('pat')
        const doc = localStorage.getItem('doc')
        if (pat || doc) {
            navigate('/')
        }
    }, []);

    const check = async () => {

        if (!email || !paswd) {
            alert('Invalid input')
            navigate('/plogin')
            return;
        }

        let result = await fetch(props.deploy + "plogin", {
            method: 'post',
            body: JSON.stringify({ email, paswd }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();
        if (result.name) {
            localStorage.setItem('pat', JSON.stringify(result))
            props.setloggedin(1)
            navigate('/phome')
        }
        else
            alert('Invalid Credentials')
    }

    return (
        <div className='container' style={{ minHeight: "calc(100vh - 277px)" }}>
            <center style={{ margin: "20px", padding: "10px" }}><h1>Patient Login</h1></center>
            <form style={{ margin: "20px", padding: "10px", border: "2px solid grey", borderRadius: "10px" }}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Password</label>
                    <input type="password" className="form-control" id="pwd" value={paswd} onChange={(e) => { setPaswd(e.target.value) }} />
                </div>
                <button type="button" onClick={check} className="btn btn-primary">Submit</button>
                <div style={{ marginTop: '20px' }}>
                    <div>Don't have an account..?</div>
                    <button className="btn btn-primary"><Link style={{ color: 'white', textDecoration: 'None' }} to="/pregister">Register</Link></button>
                </div>
            </form>
        </div>
    )
}

export default Plogin