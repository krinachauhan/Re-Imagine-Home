import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Page/Home'
import About from './Page/About'
import History from './Page/History'
import Header from './Component/Header'
import Footer from './Component/Footer'
import Upload from './Page/Upload'
import Login from './Page/Login'
import Profile from './Page/Profile'
import Download from './Page/Download'
import Contact from './Page/Contact'
import Register from './Page/Register'
import Demo from './Page/Demo'
import ChangePassword from './Page/ChangePassword'
import ForgotPassword from './Page/ForgotPassword'
import ResizeImage from './Page/ResizeImage'
// import Reg from './Page/Reg'
// import Header2 from './Component/Header2'
const App = () => {
  return (
    <>
      <Router>
        <Header />
        {/* <Header2 /> */}
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about-us' element={<About />}/>
          <Route path='/contact-us' element={<Contact />}/>
          <Route path='/history' element={<History />}/>
          <Route path='/upload-image' element={<Upload />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/download' element={<Download />} />
          <Route path='/demo' element={<Demo />} />
          <Route path='/password' element={<ChangePassword />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/resize' element={<ResizeImage />} />
          {/* <Route path='/reg' element={<Reg />} /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
