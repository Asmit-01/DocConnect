import React, { useEffect, useState } from 'react'
import Card from './Card'
import { useNavigate } from 'react-router-dom'


function Home(props) {
    const navigate = useNavigate();

    const [pat, setpat] = useState(0);

    useEffect(() => {
        const p = localStorage.getItem('pat');
        if (p) setpat(1);

        const doc = localStorage.getItem('doc');
        const lab = localStorage.getItem('lab');
        if (p) {
            navigate('/phome');
        }
        else if (doc) {
            navigate('/dhome')
        }
        else if (lab) {
            navigate('/labhome')
        }
        else {
            localStorage.clear();
        }
    });

    return (
        <div>
            <img src="images\Screenshot 2023-03-20 215000.png" alt="" style={{ width: '100%', height: '30rem' }} />
            <div className='my-2 container'>
                <div className='row'>
                    <h3 className='my-0'>Services we offer</h3>
                    <p className='my-0'>Get best healthcare facilities</p>
                    <Card img='doctor.png' setFilter={props.setFilter} filter="" link={pat ? "/dsearch" : '/'} title='Find Doctors Near You' text='Confirmed Appointments' />
                    <Card img='delivery.png' filter="" link="https://www.netmeds.com/" title='Medicines' text='Essentials at your doorstep' />
                    <Card img='labtest.png' filter="" link={pat ? "/testlist" : '/'} title='Lab Tests' text='Sample pickup at your home' />
                    <Card img='surgery.png' setFilter={props.setFilter} filter="surgeon" link={pat ? "/dsearch" : '/'} title='Surgeries' text='Safe and trusted surgery centers' />
                </div>

                <div className='row' style={{ marginTop: '2.5rem' }}>
                    <h3 className='my-0'>Book an appointment for an in-clinic consultation</h3>
                    <p className='my-1'>Find experienced doctors across all specialties</p>
                    <Card img='dentist.png' setFilter={props.setFilter} filter="dentist" link={pat ? "/dsearch" : '/'} title='Dentist' text='Teething Troubles? Schedule a dental checkup' />
                    <Card img='obstetrician.png' setFilter={props.setFilter} filter="Gynecologist" link={pat ? "/dsearch" : '/'} title='Gynecologist/Obstetrician' text='Explore for womens health,pregnancy and infertility treatments' />
                    <Card img='dietician.png' setFilter={props.setFilter} filter="dietician" link={pat ? "/dsearch" : '/'} title='Dietician/Nutrition' text='Get guidance on eating right,weight management and sports nutrition' />
                    <Card img='physiothrapist.png' setFilter={props.setFilter} filter="physiotherapist" link={pat ? "/dsearch" : '/'} title='Physiotherapist' text='Pulled a muscle? Get it treated by a trained physiothrapist' />
                </div>

                <div className='row my-2'>
                    <Card img='surgeon.png' setFilter={props.setFilter} filter="surgeon" link={pat ? "/dsearch" : '/'} title='General Surgeon' text='Need to get operated? Find the right surgeon' />
                    <Card img='orthopedist.png' setFilter={props.setFilter} filter="orthopedist" link={pat ? "/dsearch" : '/'} title='Orthopedist' text='For bone and joints issues, spinal injuries and more' />
                    <Card img='physician.png' setFilter={props.setFilter} filter="physician" link={pat ? "/dsearch" : '/'} title='General Physician' text='Find the right family doctor in your neighborhood' />
                    <Card img='pediatrician.png' setFilter={props.setFilter} filter="pediatrician" link={pat ? "/dsearch" : '/'} title='Pediatrician' text='Child Specialists and Doctors for infant' />
                </div>

                <center className='my-5'>
                    <h2>Our Mission</h2>
                    <h3>Each time a patient finds the right doctor, we build a healthier nation</h3>
                    <p>DocConnect is on a mission to make quality healthcare affordable and accessible for over a billion+ Indians. We believe in empowering our users with the most accurate, comprehensive, and curated information and care, enabling them to make better healthcare decisions.</p>
                </center>

            </div>
        </div>
    )
}

export default Home