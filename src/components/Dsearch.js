import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function Dsearch(props) {
    const [res, setRes] = useState([]);
    const navigate = useNavigate();
    const [query, setQuery] = useState(props.filter)

    useEffect(() => {
        const pat = localStorage.getItem('pat')
        const doc = localStorage.getItem('doc')
        if (!pat || doc) {
            navigate('/')
        }
        else if (pat) {
            async function getData() {
                let resp = await fetch('http://localhost:5000/dsearch')
                resp = await resp.json()
                setRes(resp);
                setQuery(props.filter);
            }
            getData();
        }
    }, []);


    const search = (res) => {
        const x = query.toLowerCase();
        console.log("search", x);
        if (query === '') return res;
        return res.filter((item) => {
            return (item.name.toLowerCase().includes(x) || item.specialization.toLowerCase().includes(x) || item.city.toLowerCase().includes(x) || item.phone.toLowerCase().includes(x));
        })
    }


    const check = (item) => {
        props.setDoc(item);
        //console.log(item.name, item.city, item.email);
    }

    return (
        <center style={{ margin: '20px', minHeight: "calc(100vh - 296px)" }}>
            <h2>Doctors</h2>
            <label htmlFor="query">Search</label>
            <input type="text" placeholder='Search...' value={query} onChange={(e) => {
                //console.log(query)
                setQuery(e.target.value);
            }} />
            <table className="table table-striped table-hover table-bordered align-middle" id="example">

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Specialization</th>
                        <th>Experience</th>
                        <th>City</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {search(res).map((e, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{'Dr. ' + e.name}</td>
                                <td>{e.specialization}</td>
                                <td>{e.exp}</td>
                                <td>{e.city}</td>
                                <td>{e.phone}</td>
                                <td><button onClick={() => check(e)} className="btn btn-primary"><Link to='/appointment' style={{ color: 'white', textDecoration: 'none' }} >Book Appointment</Link></button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </center>
    )
}

export default Dsearch 