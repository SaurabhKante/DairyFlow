
import { Route, Routes } from 'react-router-dom'
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
import FarmerList from './pages/FarmerList'
import AddFarmer from './pages/AddFarmer'
import RecordMilkIntake from './pages/RecordMilkIntake'
import PayFarmer from './pages/PayFarmer'
import CustomerList from './pages/CustomerList'
import RecordMilkDeliver from './pages/RecordMilkDeliver'
import AddCustomer from './pages/AddCustomer'
import CustomerBill from './pages/CustomerBill'

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
        <Route path="/farmer-list" element={<FarmerList />} />
        <Route path="/customer-list" element={<CustomerList />} />
        <Route path="/record-intake/:id" element={<RecordMilkIntake />}/>
        <Route path="/record-deliver/:id" element={<RecordMilkDeliver />}/>
        <Route
    path="/users"
    element={
        <AdminRoute>
            <UserManagement />
        </AdminRoute>
    }
/>
        <Route
    path="/pay-farmer/:farmerId"
    element={
        <AdminRoute>
            <PayFarmer />
        </AdminRoute>
    }
/>
        <Route
    path="/customer-bill/:customerId"
    element={
        <AdminRoute>
            <CustomerBill />
        </AdminRoute>
    }
/>
        <Route
    path="/add-farmer"
    element={
        <AdminRoute>
            <AddFarmer />
        </AdminRoute>
    }
/>
        <Route
    path="/add-customer"
    element={
        <AdminRoute>
            <AddCustomer />
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


