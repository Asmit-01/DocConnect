import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'

function Dregister(props) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [paswd, setPasswd] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddr] = useState("");
    const [exp, setExp] = useState("");
    const [file, setFile] = useState("")
    const [city, setCity] = useState("")
    const [specialization, setSpec] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const pat = localStorage.getItem('pat')
        const doc = localStorage.getItem('doc')
        if (pat || doc) {
            navigate('/')
        }
    });

    const collectdata = (e) => {
        e.preventDefault();
        let formData = new FormData()
        formData.append('file', file);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('paswd', paswd);
        formData.append('email', email);
        formData.append('address', address);
        formData.append('exp', exp);
        formData.append('specialization', specialization);
        formData.append('city', city);
        if (!name || !phone || !paswd || !email || !address || !exp || !city || !specialization || !file) {
            alert('Invalid input')
            return;
        }

        Axios.post(props.deploy + "dregister", formData).then((result) => {
            if (result.data.name) {
                alert('Registered successfully')
                console.log("ok");
                navigate('/dlogin')
            }
            else if (result.data.user) {
                alert('Doctor already registered')
                // console.log(result.data)
            }
        });
    }

    //to access the files uploaded by doctors:
    //"http://localhost:5000/uploads/1679743537254-267216900-dentist.png"

    return (
        <div className='container'>
            <center style={{ margin: "20px", padding: "10px" }}><h1>Doctor Register</h1></center>
            <form encType='multipart/form-data' type="submit" method='post' id="form" style={{ margin: "20px", padding: "10px", border: "2px solid grey", borderRadius: "10px" }} >
                <div className='row'>
                    <div className="mb-3 col">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" required={true} className="form-control" id="name" aria-describedby="nameHelp" value={name} onChange={(e) => {
                            setName(e.target.value)
                        }} />
                    </div>

                    <div className="mb-3 col">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" required={true} className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                    </div>
                </div>

                <div className='row'>
                    <div className="mb-3 col">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="number" required={true} className="form-control" id="phone" aria-describedby="phoneHelp" value={phone} onChange={(e) => {
                            setPhone(e.target.value)
                        }} />
                    </div>

                    <div className="mb-3 col">
                        <label htmlFor="exp" className="form-label">Experience</label>
                        <input type="text" required={true} placeholder="0 years  0 months" className="form-control" id="exp" value={exp} onChange={(e) => {
                            setExp(e.target.value);
                        }} />
                    </div>
                </div>

                <div className='row'>
                    <div className="mb-3 col">
                        <label htmlFor="specialization" className="form-label">Specialization</label>
                        <input type="text" required={true} className="form-control" placeholder='Physician, Dentist, Orthopedist, etc.' id="specialization" value={specialization} onChange={(e) => {
                            setSpec(e.target.value);
                        }} />
                    </div>

                    <div className="mb-3 col">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" required={true} className="form-control" id="city" value={city} onChange={(e) => {
                            setCity(e.target.value);
                        }} />
                    </div>

                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Clinic Address</label>
                    <input type="text" required={true} className="form-control" id="address" value={address} onChange={(e) => {
                        setAddr(e.target.value);
                    }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">License</label>
                    <span>&nbsp;&nbsp;(Note: Be careful you can't update this field after submission)</span>
                    <input className="form-control" required={true} type="file" onChange={(e) => setFile(e.target.files[0])} name="formFile" id="formFile" />
                </div>

                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Password</label>
                    <input type="password" required={true} className="form-control" id="pwd" value={paswd} onChange={(e) => {
                        setPasswd(e.target.value)
                    }} />
                </div>

                <button type="submit" className="btn btn-primary" onClick={collectdata}>Submit</button>
            </form>
        </div>
    )
}

export default Dregister
