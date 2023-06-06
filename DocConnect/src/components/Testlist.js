import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Testlist(props) {
    const [res, setRes] = useState([]);
    const [query, setQuery] = useState('')

    const navigate = useNavigate();
    useEffect(() => {
        const pat = localStorage.getItem('pat')
        const doc = localStorage.getItem('doc')
        const lab = localStorage.getItem('lab')

        if (!pat || doc || lab)
            navigate('/')
        async function getData() {
            let resp = await fetch(props.deploy + 'testlist')
            resp = await resp.json()
            setRes(resp);
        }
        getData();

    }, []);


    const search = (res) => {
        const x = query.toLowerCase();
        console.log("search", x);
        if (query === '') return res;
        return res.filter((item) => {
            return (item.name.toLowerCase().includes(x), item.desc.toLowerCase().includes(x));
        })
    }

    const check = (e) => {
        props.setTest(e);
    }

    return (
        <center style={{ margin: '20px', minHeight: "calc(100vh - 296px)" }}>
            <h2>Tests Available</h2>
            <label htmlFor="query">Search</label>
            <input type="text" placeholder='Search...' value={query} onChange={(e) => {
                //console.log(query)
                setQuery(e.target.value);
            }} />
            <table className="table table-striped table-hover table-bordered align-middle" id="example">

                <thead>
                    <tr>
                        <th>Test Name</th>
                        <th>Desc</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {search(res).map((e, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{e.name}</td>
                                <td>{e.desc}</td>
                                <td>{e.price}</td>
                                <td><button className="btn btn-primary" onClick={() => check(e)}><Link to='/test' style={{ color: 'white', textDecoration: 'none' }} >Book Test</Link></button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </center>
    )
}

export default Testlist