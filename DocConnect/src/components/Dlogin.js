import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Dlogin(props) {
    const [email, setEmail] = useState('')
    const [paswd, setPaswd] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        const pat = localStorage.getItem('pat')
        const doc = localStorage.getItem('doc')
        const lab = localStorage.getItem('lab')
        if (pat || doc || lab) {
            navigate('/')
        }
    })

    const check = async () => {

        if (!email || !paswd) {
            alert('Invalid input')
            navigate(`/${props.link}`)
            return;
        }

        let result = await fetch(props.deploy + `${props.link}`, {
            method: 'post',
            body: JSON.stringify({ email, paswd }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();

        //console.log(result)
        if (result.name && result.status === "verified") {
            localStorage.setItem(props.set, JSON.stringify(result))
            if (props.set === 'doc') {
                props.setloggedin(2)
                navigate('/dhome')
            }
            else {
                props.setloggedin(3)
                navigate('/labhome')
            }
        }
        else if (result.check)
            alert('You are not verified by the admin. Please login after completion of verification');
        else
            alert('Invalid Credentials');
    }

    return (
        <div className='container' style={{ minHeight: "calc(100vh - 277px)" }}>
            <center style={{ margin: "20px", padding: "10px" }}><h1>{props.text}</h1></center>
            <form style={{ margin: "20px", padding: "10px", border: "2px solid grey", borderRadius: "10px" }}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Email</label>
                    <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="emial" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Password</label>
                    <input type="password" className="form-control" id="pwd" value={paswd} onChange={(e) => { setPaswd(e.target.value) }} />
                </div>
                <button type="button" onClick={check} className="btn btn-primary">Submit</button>
                <div style={{ marginTop: '20px' }}>
                    <div>Don't have an account..?</div>
                    <button className="btn btn-primary"><Link style={{ color: 'white', textDecoration: 'None' }} to={props.register}>Register</Link></button>
                </div>
            </form>
        </div>
    )
}

export default Dlogin