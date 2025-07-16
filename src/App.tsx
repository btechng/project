import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage/HomePage'
import SignUpPage from './Pages/SignUpPage/SignUpPage'
import LoginPage from './Pages/LoginPage/LoginPage'
import UserProfilePage from './Pages/UserProfilePage/UserProfilePage'
import UserDetails from './Pages/UserDetails/UserDetails'
import UpdateAllUsers from './Pages/UpdateAllUsers/UpdateAllUser'




function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/userprofile' element={<UserProfilePage/>}/>
        <Route path='/userdetails/:id' element={<UserDetails/>}/>
        <Route path='/updateallusers/:id' element={<UpdateAllUsers/>}/>
      </Routes>
    </>
  )
}

export default App
