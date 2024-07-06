import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Home from '../Components/Home/Home'
import LLM from '../Components/Latest Movies/LLM/LLM'
import Footer from '../Components/Footer/Footer'
// import Registration from '../Components/Registration/Registration'
// import Login from '../Components/Login/Login'
// import Profile from '../Components/Profile/Profile'
// import Forgot from '../Components/Forgot/Forgot'

const Routing = () => {
    return (
        <Router>
            <Routes>
                {/* <Route path='/register' element={<Registration />} />
                <Route path='/user/dashboard' element={<Profile />} />
                <Route path='/forget-password' element={<Forgot />} />
                <Route path='/' element={<Login />} /> */}
                <Route path='/' element={<Home />} />
                <Route path='/llm' element={<LLM />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default Routing