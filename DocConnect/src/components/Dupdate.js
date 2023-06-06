import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function Dupdate(props) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [paswd, setPasswd] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddr] = useState("");
    const [exp, setExp] = useState("");
    const [city, setCity] = useState("")
    const [specialization, setSpec] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const pat = localStorage.getItem('pat')
        const doc = localStorage.getItem('doc')
        if (pat || !doc) {
            navigate('/')
        }
    }, []);

    const collectdata = async (e) => {
        const auth = await JSON.parse(localStorage.getItem('doc'));
        const cuEmail = auth.email;

        let result = await fetch(props.deploy + `dupdate`, {
            method: 'POST',
            body: JSON.stringify({ cuEmail, name, phone, email, address, paswd, exp, city, specialization }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();

        if (result.result) {
            alert('Details Updated')
            console.log(result)
            navigate('/dhome')
        }
        else {
            alert('Some error occurred')
        }
    }

    //to access the files uploaded by doctors:
    //"http://localhost:5000/uploads/1679743537254-267216900-dentist.png"

    return (
        <div className='container'>
            <center style={{ margin: "20px", padding: "10px" }}><h1>Update Details</h1></center>
            <p style={{ marginLeft: '20px' }}>Note: Leave the field blank if you don't want to update that field</p>
            <form style={{ margin: "20px", marginTop: '0px', padding: "10px", border: "2px solid grey", borderRadius: "10px" }} >
                <div className='row'>
                    <div className="mb-3 col">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" aria-describedby="nameHelp" value={name} onChange={(e) => {
                            setName(e.target.value)
                        }} />
                    </div>

                    <div className="mb-3 col">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                    </div>
                </div>

                <div className='row'>
                    <div className="mb-3 col">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="number" className="form-control" id="phone" aria-describedby="phoneHelp" value={phone} onChange={(e) => {
                            setPhone(e.target.value)
                        }} />
                    </div>

                    <div className="mb-3 col">
                        <label htmlFor="exp" className="form-label">Experience</label>
                        <input type="text" placeholder="0 years  0 months" className="form-control" id="exp" value={exp} onChange={(e) => {
                            setExp(e.target.value);
                        }} />
                    </div>
                </div>

                <div className='row'>
                    <div className="mb-3 col">
                        <label htmlFor="specialization" className="form-label">Specialization</label>
                        <input type="text" className="form-control" placeholder='Physician, Dentist, Orthopedist, etc.' id="specialization" value={specialization} onChange={(e) => {
                            setSpec(e.target.value);
                        }} />
                    </div>

                    <div className="mb-3 col">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" className="form-control" id="city" value={city} onChange={(e) => {
                            setCity(e.target.value);
                        }} />
                    </div>

                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Clinic Address</label>
                    <input type="text" className="form-control" id="address" value={address} onChange={(e) => {
                        setAddr(e.target.value);
                    }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Password</label>
                    <input type="password" className="form-control" id="pwd" value={paswd} onChange={(e) => {
                        setPasswd(e.target.value)
                    }} />
                </div>

                <button type="button" className="btn btn-primary" onClick={collectdata}>Submit</button>
            </form>
        </div>
    )
}

export default Dupdate
