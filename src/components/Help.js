import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Help() {
    const navigate = useNavigate();
    const [email, setemail] = useState('');
    const [desc, setdesc] = useState('');

    const check = () => {
        if (email === '' || desc === '') alert('Invalid input')
        else {
            alert("Thanks for your patience. We'll get back to you shortly")
            navigate('/')
        }
    }
    return (
        <div style={{ width: '50%', alignItems: "center", marginLeft: '25%', marginRight: '25%', marginTop: '10%', minHeight: 'calc(100vh - 55vh)' }}>
            <center style={{ marginBottom: '2%' }}><h2>Write to Us</h2></center>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Your Email address</label>
                <input type="email" onChange={(e) => { setemail(e.target.value) }} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
            <div className="mb-3" >
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Description of the problem</label>
                <textarea className="form-control" onChange={(e) => { setdesc(e.target.value) }} id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <button type="submit" className="btn btn-primary" onClick={check} >Submit</button>
        </div>
    )
}

export default Help 