import React from 'react'
import { Link } from 'react-router-dom'
function Card(props) {
    const auth = localStorage.getItem('pat')
    const p = props.link;
    return (
        <Link onClick={() => {
            if (!p.includes('netmeds')) {
                if (auth == null) alert('Please login first')
                props.setFilter(props.filter);
            }
        }} className="card col mx-3 my-1" to={props.link} target={p.includes('netmeds') ? 'blank' : ''} style={{ width: "18rem", textDecoration: 'none', color: 'black' }}>
            <img src={`images/${props.img}`} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.text}</p>
            </div>
        </Link>
    )
}

export default Card