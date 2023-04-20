import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Test(props) {
    const [day, setDay] = useState("");
    const [tt, setTt] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const pat = localStorage.getItem('pat')
        const doc = localStorage.getItem('doc')
        if (!pat || doc) {
            navigate('/')
        }
    });

    const lname = props.lab.name;
    const lemail = props.lab.email;
    const lphone = props.lab.phone;
    const ladd = props.lab.addres;

    const auth = JSON.parse(localStorage.getItem('pat'));
    const pname = auth.name;
    const pmob = auth.phone;
    const pemail = auth.email;
    const padd = auth.address;

    const collectdata = async (event) => {
        event.preventDefault();
        if (!day || !tt) {
            alert('Invalid input')
            navigate('/test')
            return;
        }

        let result = await fetch("http://127.0.0.1:5000/test", {
            method: 'POST',
            body: JSON.stringify({ lemail, pemail, day, tt }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();

        if (result.result) {
            alert('Test booked')
            navigate('/lablist')
        }
        else if (result.error) {
            alert('Test not booked')
            navigate('/lablist')
        }
    }

    return (
        <div className='container' style={{ margin: "20px", padding: "10px", marginLeft: '100px' }}>
            <center style={{ marginTop: "10px", padding: "10px" }}><h1>Book Diagnostics Test</h1></center>

            <div className="mb-3">
                <span className="form-label" >Patient Name :- </span>
                <span>&nbsp;&nbsp;{pname}</span>
            </div>

            <div className="mb-3">
                <span className="form-label" >Patient Email :- </span>
                <span>&nbsp;&nbsp;{pemail}</span>
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
                <span className="form-label" >Lab Name :- </span>
                <span>&nbsp;&nbsp;{lname}</span>
            </div>

            <div className="mb-3">
                <span className="form-label" >Lab Email :- </span>
                <span>&nbsp;&nbsp;{lemail}</span>
            </div>

            <div className="mb-3">
                <span className="form-label" >Lab Phone :- </span>
                <span>&nbsp;{lphone}</span>
            </div>

            <div className="mb-3">
                <span className="form-label" >Lab Address :- </span>
                <span>&nbsp;&nbsp;{ladd}</span>
            </div>

            <div className="mb-3" style={{ width: '50%' }}>
                <span htmlFor="day" className="form-label">Date</span>
                <input type="date" className="form-control" id="date" value={day} onChange={(e) => {
                    setDay(e.target.value);
                }} />
            </div>



            <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="..." className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="..." className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="..." className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>


            <button type="button" className="btn btn-primary" onClick={collectdata}>Submit</button>
        </div>
    )
}

export default Test