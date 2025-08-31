import { Navigate, Routes, Route } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import './App.css'

function App() {
  const authContext = useAuth();
  let isUserLoggedIn;
  if (authContext) isUserLoggedIn = authContext.isUserLoggedIn;
  
  return (
    <div>
      {!isUserLoggedIn && <Navigate to={'/login'} replace={true} />}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
