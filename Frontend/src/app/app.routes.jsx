import {createBrowserRouter} from 'react-router'
import Register from '../features/auth/pages/Register.jsx'
import Login from '../features/auth/pages/Login.jsx'
import Dashboard from '../features/chat/pages/Dashboard.jsx'
import Protected from '../features/auth/components/Protected.jsx'
import { Navigate } from 'react-router'


const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>   
    },
    {
        path: '/register',
        element:<Register />
    },
    {
        path: '/',
        element:<Protected>
            <Dashboard />
        </Protected>
    },
    {
        path:'/dashboard',
        element: <Navigate to='/' replace />
    }
])

export default router