
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import ProtectedRoute from './apiRouter/ProtectedRoute'
import PublicRoute from './apiRouter/PublicRoute'
import Register from './pages/Register'
import Profile from './pages/Profile'
import UpdateProfile from './pages/UpdateProfile'
import UserManagement from './pages/UserManagement'
import Unauthorized from './pages/Unauthorized'
import AdminRoute from './pages/AdminRoute'

function App() {

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route
    path="/users"
    element={
        <AdminRoute>
            <UserManagement />
        </AdminRoute>
    }
/>

<Route
    path="/register"
    element={
        <AdminRoute>
            <Register />
        </AdminRoute>
    }
/>

<Route
    path="/unauthorized"
    element={<Unauthorized />}
/>
      </Routes>
    </>
  )
}

export default App


