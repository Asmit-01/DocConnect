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

function App() {
  const [filter, setFilter] = useState('')
  const [doc, setDoc] = useState('')
  const [loggedin, setloggedin] = useState(0)
  const [test, setTest] = useState('')

  return (
    <div>
      <BrowserRouter>
        <Navbar loggedin={loggedin} setloggedin={setloggedin} />
        <Routes>
          <Route path='/' element={<Home setFilter={setFilter} />} />
          <Route path='/pregister' element={<Pregister />} />
          <Route path='/plogin' element={<Plogin setloggedin={setloggedin} />} />
          <Route path='/phome' element={<Phome setFilter={setFilter} />} />
          <Route path='/dregister' element={<Dregister />} />
          <Route path='/dlogin' element={<Dlogin setloggedin={setloggedin} />} />
          <Route path='/dhome' element={<Dhome />} />
          <Route path='/dsearch' element={<Dsearch filter={filter} setDoc={setDoc} />} />
          <Route path='/appointment' element={<Appointment doc={doc} />} />
          <Route path='/pupdate' element={<Pupdate />} />
          <Route path='/dupdate' element={<Dupdate />} />
          <Route path='/dappointlist' element={<DappointList />} />
          <Route path='/pappointlist' element={<DappointList />} />
          <Route path='/help' element={<Help />} />
          <Route path='/labregister' element={<LabRegister />} />
          <Route path='/testlist' element={<Testlist setTest={setTest} />} />
          <Route path='/test' element={<Test />} />
          <Route path='/login' element={<Login text='Login' d='/dlogin' p='/plogin' />} />
          <Route path='/register' element={<Login text='Register' d='/dregister' p='/pregister' l='/labregister' />} />
        </Routes>
        <Footer loggedin={loggedin} />
      </BrowserRouter>
    </div>
  )
}

export default App