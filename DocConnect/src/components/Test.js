import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Test(props) {
    const [day, setDay] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const pat = localStorage.getItem('pat')
        const doc = localStorage.getItem('doc')
        const lab = localStorage.getItem('lab')

        if (!pat || doc || lab || props.test === "") {
            navigate('/')
        }
    });

    const testName = props.test.name;
    const auth = JSON.parse(localStorage.getItem('pat'));
    const pName = auth.name;
    const pmob = auth.phone;
    const pEmail = auth.email;
    const padd = auth.address;

    const collectdata = async (event) => {
        event.preventDefault();
        if (!day) {
            alert('Invalid input')
            navigate('/test')
            return;
        }

        let result = await fetch(props.deploy + "test", {
            method: 'POST',
            body: JSON.stringify({ pName, testName, pEmail, day, padd }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();

        if (result.success) {
            alert('Test booked, our specialist will contact you shortly');
            navigate('/testlist')
        }
        else if (result.duplicate) {
            alert('Test is already booked');
            navigate('/test')
        }
    }

    return (
        <div className='container' style={{ margin: "20px", padding: "10px", marginLeft: '100px' }}>
            <center style={{ marginTop: "10px", padding: "10px" }}><h1>Book Diagnostics Test</h1></center>

            <div className="mb-3">
                <span className="form-label" >Patient Name :- </span>
                <span>&nbsp;&nbsp;{pName}</span>
            </div>

            <div className="mb-3">
                <span className="form-label" >Patient Email :- </span>
                <span>&nbsp;&nbsp;{pEmail}</span>
            </div>

            <div className="mb-3">
                <span className="form-label" >Patient Phone :- </span>
                <span>&nbsp;{pmob}</span>
            </div>

            <div className="mb-3">
                <span className="form-label" >Patient Address :- </span>
                <span>&nbsp;&nbsp;{padd}</span>
            </div>

            <div className="mb-3">
                <span className="form-label" >Test Name :- </span>
                <span>&nbsp;&nbsp;{props.test.name}</span>
            </div>

            <div className="mb-3">
                <span className="form-label" >Test Price :- </span>
                <span>&nbsp;&nbsp;{props.test.price}</span>
            </div>


            <div className="mb-3" style={{ width: '50%' }}>
                <span htmlFor="day" className="form-label">Date</span>
                <input type="date" className="form-control" id="date" value={day} onChange={(e) => {
                    setDay(e.target.value);
                }} />
            </div>

            <button type="button" className="btn btn-primary" onClick={collectdata}>Submit</button>
        </div >
    )
}

export default Test