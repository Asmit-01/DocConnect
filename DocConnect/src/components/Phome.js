import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from './Card';

function Phome(props) {
    const navigate = useNavigate();
    props.setFilter('');

    useEffect(() => {
        const pat = localStorage.getItem('pat')
        const doc = localStorage.getItem('doc')
        if (!pat || doc) {
            navigate('/')
        }
    }, []);

    return (
        <div>
            <img src="images\Screenshot 2023-03-20 220345.png" alt="" style={{ width: '100%', height: '30rem' }} />
            <div className='my-1 container'>
                <div className='row' style={{ marginTop: '2.5rem' }}>
                    <h3 className='my-0'>Book an appointment for an in-clinic consultation</h3>
                    <p className='my-1'>Find experienced doctors across all specialties</p>
                    <Card img='dentist.png' setFilter={props.setFilter} filter="dentist" link="/dsearch" title='Dentist' text='Teething Troubles? Schedule a dental checkup' />
                    <Card img='obstetrician.png' setFilter={props.setFilter} filter="Gynecologist" link="/dsearch" title='Gynecologist/Obstetrician' text='Explore for womens health,pregnancy and infertility treatments' />
                    <Card img='dietician.png' setFilter={props.setFilter} filter="dietician" link="/dsearch" title='Dietician/Nutrition' text='Get guidance on eating right,weight management and sports nutrition' />
                    <Card img='physiothrapist.png' setFilter={props.setFilter} filter="physiotherapist" link="/dsearch" title='Physiotherapist' text='Pulled a muscle? Get it treated by a trained physiothrapist' />
                </div>

                <div className='row my-2'>
                    <Card img='surgeon.png' setFilter={props.setFilter} filter="surgeon" link="/dsearch" title='General Surgeon' text='Need to get operated? Find the right surgeon' />
                    <Card img='orthopedist.png' setFilter={props.setFilter} filter="orthopedist" link="/dsearch" title='Orthopedist' text='For bone and joints issues, spinal injuries and more' />
                    <Card img='physician.png' setFilter={props.setFilter} filter="physician" link="/dsearch" title='General Physician' text='Find the right family doctor in your neighborhood' />
                    <Card img='pediatrician.png' setFilter={props.setFilter} filter="pediatrician" link="/dsearch" title='Pediatrician' text='Child Specialists and Doctors for infant' />
                </div>
            </div>
        </div>
    )
}

export default Phome