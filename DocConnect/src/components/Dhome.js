import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dhome(props) {
    const navigate = useNavigate();
    useEffect(() => {
        const pat = localStorage.getItem('pat')
        const doc = localStorage.getItem('doc')

        if (pat || !doc) {
            navigate('/')
        }
    });

    return (
        <div>
            <img src="images\dhome.png" alt="" style={{ width: '100%', height: '30rem' }} />
            <div className='container' style={{ marginTop: '22px', marginBottom: '10px' }}><h2>Remember Your Pledge</h2></div>
            <div className='container' style={{ fontSize: '22px' }}>
                <p style={{ fontFamily: '' }}>I solemnly pledge myself to consecrate my life to service of humanity.</p>
                <ul style={{}}>
                    <li>Even under threat, I will not use my medical knowledge contrary to the laws of Humanity.</li>
                    <li>I will maintain the utmost respect for human life from the time of conception.</li>
                    <li>I will not permit considerations of religion, nationality, race, party politics or social standing to intervene between my duty and my patient.</li>
                    <li>I will practice my profession with conscience and dignity.</li>
                    <li>The health of my patient will be my first consideration.</li>
                    <li>I will respect the secrets which are confined in me.</li>
                    <li>I will give to my teachers the respect and gratitude which is their due.</li>
                    <li>I will maintain by all means in my power, the honour and noble traditions of medical profession.</li>
                    <li>I will treat my colleagues with all respect and dignity.</li>
                    <li>I shall abide by the code of medical ethics as enunciated in the Indian Medical Council (Professional Conduct, Etiquette and Ethics) Regulations 2002.</li>
                </ul>
                <p>I make these promises solemnly, freely and upon my honour.</p>
            </div>
        </div>
    )
}

export default Dhome