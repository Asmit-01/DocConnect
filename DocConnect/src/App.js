import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Pregister from './components/Pregister'
import Dregister from './components/Dregister'
import Plogin from './components/Plogin'
import Phome from './components/Phome'
import Dlogin from './components/Dlogin'
import Dhome from './components/Dhome'
import Dsearch from './components/Dsearch'
import Appointment from './components/Appointment'
import Pupdate from './components/Pupdate'
import Dupdate from './components/Dupdate'
import DappointList from './components/DappointList'
import Help from './components/Help'
import LabRegister from './components/LabRegister'
import Testlist from './components/Testlist'
import Login from './components/Login'
import Test from './components/Test'
import Labhome from './components/Labhome'

function App() {
  const [filter, setFilter] = useState('')
  const [doc, setDoc] = useState('')
  const [loggedin, setloggedin] = useState(0)
  const [test, setTest] = useState('')

  const deploy = 'https://docconnect-7ze4.onrender.com'
  //const deploy = 'http://127.0.0.1:4000/api/v1/'

  return (
    <div>
      <BrowserRouter>
        <Navbar loggedin={loggedin} setloggedin={setloggedin} deploy={deploy} />
        <Routes>
          <Route path='/' element={<Home setFilter={setFilter} deploy={deploy} />} />
          <Route path='/pregister' element={<Pregister deploy={deploy} />} />
          <Route path='/plogin' element={<Plogin setloggedin={setloggedin} deploy={deploy} />} />
          <Route path='/phome' element={<Phome setFilter={setFilter} deploy={deploy} />} />
          <Route path='/dregister' element={<Dregister deploy={deploy} />} />
          <Route path='/dlogin' element={<Dlogin setloggedin={setloggedin} text='Doctor Login' link='dlogin' set='doc' register='/dregister' deploy={deploy} />} />
          <Route path='/dhome' element={<Dhome deploy={deploy} />} />
          <Route path='/dsearch' element={<Dsearch filter={filter} setDoc={setDoc} link='dsearch' text='Doctors Available' flag='0' deploy={deploy} />} />
          <Route path='/appointment' element={<Appointment doc={doc} deploy={deploy} />} />
          <Route path='/pupdate' element={<Pupdate deploy={deploy} />} />
          <Route path='/dupdate' element={<Dupdate deploy={deploy} />} />
          <Route path='/dappointlist' element={<DappointList deploy={deploy} />} />
          <Route path='/pappointlist' element={<DappointList deploy={deploy} />} />
          <Route path='/help' element={<Help deploy={deploy} />} />
          <Route path='/labregister' element={<LabRegister deploy={deploy} />} />
          <Route path='/testlist' element={<Testlist setTest={setTest} deploy={deploy} />} />
          <Route path='/test' element={<Test test={test} deploy={deploy} />} />
          <Route path='/lablogin' element={<Dlogin setloggedin={setloggedin} text='Lab Login' link='lablogin' set='lab' register='/labregister' deploy={deploy} />} />
          <Route path='/labhome' element={<Labhome deploy={deploy} />} />
          <Route path='/login' element={<Login text='Login' d='/dlogin' p='/plogin' l='/lablogin' deploy={deploy} />} />
          <Route path='/register' element={<Login text='Register' d='/dregister' p='/pregister' l='/labregister' deploy={deploy} />} />
          <Route path='/alltests' element={<Dsearch filter='' link='alltests' text='All Test Bookings' flag='0' action='take' deploy={deploy} />} />
          <Route path='/selectedtests' element={<Dsearch filter='' link='selectedtests' text='Selected Tests' flag='1' action='done' deploy={deploy} />} />
        </Routes>
        <Footer loggedin={loggedin} />
      </BrowserRouter>
    </div>
  )
}

export default App