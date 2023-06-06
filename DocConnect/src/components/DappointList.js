import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function DappointList(props) {
    const [res, setRes] = useState([]);
    const navigate = useNavigate();
    const [query, setQuery] = useState('')
    const [change, setChange] = useState(0)

    const p = JSON.parse(localStorage.getItem('pat'))
    const d = JSON.parse(localStorage.getItem('doc'))
    let pat = false
    let doc = false
    if (p != null) pat = true;
    if (d != null) doc = true;

    useEffect(() => {
        if (!pat && !doc) {
            navigate('/')
        }
        else if (doc) {
            let dem = d.email;

            async function getData() {
                let resp = await fetch(props.deploy + 'dappointlist', {
                    method: 'POST',
                    body: JSON.stringify({ dem }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                resp = await resp.json()
                setRes(resp);
            }
            getData();
        }
        else if (pat) {
            let pemail = p.email;
            async function getData() {
                let resp = await fetch(props.deploy + 'pappointlist', {
                    method: 'POST',
                    body: JSON.stringify({ pemail }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                resp = await resp.json()
                setRes(resp);
            }
            getData();
        }

    }, [change]);


    const search = (res) => {
        const x = query.toLowerCase();
        if (query === '') return res;

        return res.filter((item) => {
            return (item.pName.toLowerCase().includes(x) || item.date.toLowerCase().includes(x) || item.time.toLowerCase().includes(x) || item.pMob.toLowerCase().includes(x) || item.dName.toLowerCase().includes(x) || item.dEmail.toLowerCase().includes(x));
        })
    }

    const check = async (item) => {
        if (window.confirm("This action cannot be reversed..Are you sure?")) {
            let x = await fetch(props.deploy + 'cancelappointment', {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json'
                },
            });


            setChange(1 - change);
            x = await x.json();
            console.log(x);
        }
        if (doc)
            navigate('/dappointlist')
        else if (pat)
            navigate('/pappointlist')
    }


    return (
        <center style={{ margin: '20px', minHeight: "calc(100vh - 296px)" }}>
            <h2>Appointments</h2>
            <label htmlFor="query">Search</label>
            <input type="text" placeholder='Search...' value={query} onChange={(e) => {
                setQuery(e.target.value);
            }} />
            <table className="table table-striped table-hover table-bordered align-middle" id="example">

                <thead>
                    <tr>
                        {doc ? <th>Patient Name</th> : <th>Doctor Name</th>}
                        {doc ? <th>Patient Email</th> : <th>Doctor Email</th>}
                        {doc ? <th>Patient Phone</th> : <th>Doctor Phone</th>}
                        {doc ? <th>Age</th> : <th>Specialization</th>}
                        <th>Date</th>
                        <th>Time</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {search(res).map((e, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{doc ? e.pName : 'Dr. ' + e.dName}</td>
                                <td>{doc ? e.pEmail : e.dEmail}</td>
                                <td>{doc ? e.pMob : e.dMob}</td>
                                <td>{doc ? e.age : e.specialization}</td>
                                <td>{e.date}</td>
                                <td>{e.time}</td>

                                <td>{e.status === 'active' ? <button onClick={() => check(e)} className="btn btn-primary"><Link style={{ color: 'white', textDecoration: 'none' }} >Cancel Appointment</Link></button> : <button>Cancelled</button>}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </center>
    )
}

export default DappointList