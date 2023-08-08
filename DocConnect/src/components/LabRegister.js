import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'

function LabRegister(props) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddr] = useState("");
    const [file, setFile] = useState("");
    const [city, setCity] = useState("");
    const [data, setdata] = useState([]);
    const [paswd, setPaswd] = useState("");
    let check = [];

    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            let resp = await fetch(props.deploy + 'testlist')
            resp = await resp.json()
            setdata(resp);
        }
        getData().then(() => {
            check = [...check, ...Array(Math.max(data.length - check.length, 0)).fill("")]
        });
    }, [])

    const collectdata = (e) => {
        e.preventDefault();
        let formData = new FormData()
        formData.append('file', file);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('address', address);
        formData.append('city', city);
        formData.append('paswd', paswd);

        check = check.toString();
        formData.append('check', check);
        if (!name || !phone || !email || !address || !city || !file) {
            alert('Invalid input')
            return;
        }

        Axios.post(props.deploy + "labregister", formData).then((result) => {
            if (result.data.name) {
                alert('Registered successfully')
                console.log("ok");
                navigate('/')
            }
            else if (result.data.user) {
                alert('Lab already registered')
                // console.log(result.data)
            }
        });
    }

    //to access the files uploaded by doctors:
    //"http://localhost:5000/uploads/1679743537254-267216900-dentist.png"

    return (
        <div className='container'>
            <center style={{ margin: "20px", padding: "10px" }}><h1>Lab Register</h1></center>
            <form encType='multipart/form-data' type="submit" method='post' id="form" style={{ margin: "20px", padding: "10px", border: "2px solid grey", borderRadius: "10px" }} >
                <div className='row'>
                    <div className="mb-3 col">
                        <label htmlFor="name" className="form-label">Name of Lab</label>
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
                <div className="row">
                    <div className="mb-3 col">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="number" required={true} className="form-control" id="phone" aria-describedby="phoneHelp" value={phone} onChange={(e) => {
                            setPhone(e.target.value)
                        }} />
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="paswd" className="form-label">Password</label>
                        <input type="text" required={true} className="form-control" id="paswd" aria-describedby="phoneHelp" value={paswd} onChange={(e) => {
                            setPaswd(e.target.value)
                        }} />
                    </div>
                </div>


                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" required={true} className="form-control" id="city" value={city} onChange={(e) => {
                        setCity(e.target.value);
                    }} />
                </div>


                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Lab Address</label>
                    <input type="text" required={true} className="form-control" id="address" value={address} onChange={(e) => {
                        setAddr(e.target.value);
                    }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">License</label>
                    <span>&nbsp;&nbsp;(Note: Be careful you can't update this field after submission)</span>
                    <input className="form-control" required={true} type="file" onChange={(e) => setFile(e.target.files[0])} name="formFile" id="formFile" />
                </div>

                {data.map((item, idx) => {
                    return (
                        <div key={idx} className="row">
                            <div className="mb-3 col">
                                <label htmlFor="test" className="form-label">Test Name</label>
                                <input type="text" className="form-control" id="test" aria-describedby="emailHelp" value={item.name} disabled={true} />
                            </div>

                            <div className="mb-3 col">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="number" className="form-control" id="price" aria-describedby="emailHelp" value={item.price} disabled={true} />
                            </div>

                            <div className="mb-3 col">
                                <label htmlFor="price" className="form-label">Do you Perform this test?</label>
                                <input type="text" className="form-control" id="check" aria-describedby="phoneHelp" value={check[idx]} onChange={(e) => {
                                    check[idx] = e.target.value;
                                }} />
                            </div>
                        </div>
                    )
                })}
                <button type="submit" className="btn btn-primary" onClick={collectdata}>Submit</button>
                <div className='my-2'>Note: For any issue regarding the prices please contact us.</div>
            </form>
        </div>
    )
}


export default LabRegister
