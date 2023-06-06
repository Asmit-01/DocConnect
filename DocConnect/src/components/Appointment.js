import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Appointment(props) {
    const [day, setDay] = useState("");
    const [tim, setTime] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const pat = localStorage.getItem('pat')
        const doc = localStorage.getItem('doc')
        const lab = localStorage.getItem('lab')
        if (!pat || doc || lab) {
            navigate('/')
        }
    });

    const dname = props.doc.name;
    const demail = props.doc.email;
    const dphone = props.doc.phone;
    const spec = props.doc.specialization;

    const auth = JSON.parse(localStorage.getItem('pat'));
    const pname = auth.name;
    const pmob = auth.phone;
    const pemail = auth.email;
    //const age = auth.age;

    const collectdata = async (event) => {
        event.preventDefault();
        if (!day || !tim) {
            alert('Invalid input')
            navigate('/appointment')
            return;
        }

        let result = await fetch(props.deploy + 'appointment', {
            method: 'POST',
            body: JSON.stringify({ demail, pemail, day, tim, dname, pname }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();

        if (result.result) {
            alert('Appointment Scheduled')
            navigate('/dsearch')
        }
        else if (result.error) {
            alert('Appointment already booked')
            navigate('/dsearch')
        }
        else if (result.limit) {
            alert('Slot is not available, Please select some other slot or change the date')
            navigate('/appointment')
        }
    }

    return (
        <div className='container' style={{ margin: "20px", padding: "10px", marginLeft: '100px' }}>
            <center style={{ marginTop: "10px", padding: "10px" }}><h1>Schedule Appointment</h1></center>

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
                <span className="form-label" >Doctor Name :- </span>
                <span>&nbsp;&nbsp;{dname}</span>
            </div>

            <div className="mb-3">
                <span className="form-label" >Doctor Email :- </span>
                <span>&nbsp;&nbsp;{demail}</span>
            </div>

            <div className="mb-3">
                <span className="form-label" >Doctor Phone :- </span>
                <span>&nbsp;{dphone}</span>
            </div>

            <div className="mb-3">
                <span className="form-label" >Specialization :- </span>
                <span>&nbsp;&nbsp;{spec}</span>
            </div>

            <div className="mb-3" style={{ width: '50%' }}>
                <span htmlFor="day" className="form-label">Date</span>
                <input type="date" className="form-control" id="date" value={day} onChange={(e) => {
                    setDay(e.target.value);
                }} />
            </div>
            <label htmlFor="gender" className="form-label">Time</label>
            <div className='mb-3'>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="time" id="10-11" value="10-11 AM" onClick={() => {
                        setTime('10-11 AM');
                    }} />
                    <label className="form-check-label" htmlFor="time">10-11 AM</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="time" id="11-12" value="11-12 AM" onClick={() => {
                        setTime('11-12 AM');
                    }} />
                    <label className="form-check-label" htmlFor="time">11-12 AM</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="time" id="6-7" value="6-7 PM" onClick={() => {
                        setTime('6-7 PM');
                    }} />
                    <label className="form-check-label" htmlFor="time">6-7 PM</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="time" id="7-8" value="7-8 PM" onClick={() => {
                        setTime('7-8 PM');
                    }} />
                    <label className="form-check-label" htmlFor="time">7-8 PM</label>
                </div>
            </div>

            <button type="button" className="btn btn-primary" onClick={collectdata}>Submit</button>
        </div>
    )
}

export default Appointment