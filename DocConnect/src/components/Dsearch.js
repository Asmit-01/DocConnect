import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function Dsearch(props) {
    const [res, setRes] = useState([]);
    const navigate = useNavigate();
    const [query, setQuery] = useState(props.filter)
    const [u, setu] = useState(0);

    useEffect(() => {
        const pat = localStorage.getItem('pat')
        const doc = localStorage.getItem('doc')
        const lab = localStorage.getItem('lab')

        if (lab) setu(1);

        if ((!pat && !lab) || doc) {
            navigate('/')
        }
        else if (pat || lab) {
            if (props.flag === '1') {
                async function getData1() {
                    let l = localStorage.getItem('lab');
                    l = JSON.parse(l);
                    const lem = l.email;

                    let resp = await fetch(props.deploy + `${props.link}`, {
                        method: 'post',
                        body: JSON.stringify({ lem: lem }),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                    resp = await resp.json()
                    setRes(resp);
                    setQuery(props.filter);
                }
                getData1();
            }
            else {
                async function getData() {
                    let resp = await fetch(props.deploy + `${props.link}`)
                    resp = await resp.json()
                    setRes(resp);
                    setQuery(props.filter);
                }
                getData();
            }
        }
    }, [props]);


    const search = (res) => {
        const x = query.toLowerCase();
        console.log("search", x);
        if (query === '') return res;
        return res.filter((item) => {
            return u === 0 ? (item.name.toLowerCase().includes(x) || item.specialization.toLowerCase().includes(x) || item.city.toLowerCase().includes(x) || item.phone.toLowerCase().includes(x)) : (item.pEmail.toLowerCase().includes(x) || item.pname.toLowerCase().includes(x) || item.address.toLowerCase().includes(x) || item.testName.toLowerCase().includes(x) || item.date.toLowerCase().includes(x));
        })
    }


    const check = (item) => {
        props.setDoc(item);
        //console.log(item.name, item.city, item.email);
    }

    const check1 = async (item) => {
        let l = localStorage.getItem('lab');
        l = JSON.parse(l);
        const lem = l.email;

        let result = await fetch(props.deploy + `${props.action}`, {
            method: 'post',
            body: JSON.stringify({ ...item, lem: lem }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();

        if (result.success && props.flag === '0')
            navigate('/selectedtests')
        else if (result.success)
            navigate('/labhome')
    }

    return (
        <center style={{ margin: '20px', minHeight: "calc(100vh - 296px)" }}>
            <h2>{props.text}</h2>
            <label htmlFor="query">Search</label>
            <input type="text" placeholder='Search...' value={query} onChange={(e) => {
                //console.log(query)
                setQuery(e.target.value);
            }} />
            {props.flag === '1' ? <div>Note: Please mark the test as done only after sending the report to the patient.</div> : <></>}
            <table className="table table-striped table-hover table-bordered align-middle" id="example">

                <thead>
                    <tr>
                        {u === 0 ? <th>Name</th> : <th>Patient Name</th>}
                        {u === 0 ? <th>Specialization</th> : <th>Test Name</th>}
                        {u === 0 ? <th>Experience</th> : <th>Patient Email</th>}
                        {u === 0 ? <th>City</th> : <th>Patient Address</th>}
                        {u === 0 ? <th>Phone</th> : <th>Date</th>}
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {search(res).map((e, idx) => {
                        return (
                            <tr key={idx}>
                                {u === 0 ? <td>{'Dr. ' + e.name}</td> : <td>{e.pname}</td>}
                                {u === 0 ? <td>{e.specialization}</td> : <td>{e.testName}</td>}
                                {u === 0 ? <td>{e.exp}</td> : <td>{e.pEmail}</td>}
                                {u === 0 ? <td>{e.city}</td> : <td>{e.address}</td>}
                                {u === 0 ? <td>{e.phone}</td> : <td>{e.date}</td>}
                                {u === 0 ? <td><button onClick={() => check(e)} className="btn btn-primary"><Link to='/appointment' style={{ color: 'white', textDecoration: 'none' }} >Book Appointment</Link></button></td> : props.flag === '0' ? <td><button onClick={() => check1(e)} className="btn btn-primary"><Link style={{ color: 'white', textDecoration: 'none' }} >Perform Test</Link></button></td> : e.status === 'active' ? <td><button onClick={() => check1(e)} className="btn btn-primary"><Link style={{ color: 'white', textDecoration: 'none' }} >Mark As Done</Link></button></td> : <td><button>Done</button></td>}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </center>
    )
}

export default Dsearch 