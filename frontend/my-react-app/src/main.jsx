import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './components/Login.jsx'
import Donor from './components/Donor.jsx'
import Donate from './components/Donate.jsx'
import Register from './components/Register.jsx'
import Home from './components/Home.jsx'
import Donated from './components/Donated.jsx'
import Profile from './components/Profile.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Details from './components/Details.jsx'
import Camp from './components/Camp.jsx'
import VolunteerForm from './components/VolunteerForm.jsx'
import Volunter from './components/Volunter.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/home/:userId", 
    element: <Home />
},
  {
        path: "/donate/:userId", 
        element: <Donate />
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },

  {
    path: "/donor",
    element: <Donor/>,
  },
  {
    path:"/donate",
    element:<Donate/>
  },
  {
        path: "/donated/:_id", 
        element: <Donated />
  },
  {
    path:"/donated",
    element:<Donated/>
  },

  {
    path:"/details",
    element:<Details/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },
  {
    path:"/camp",
    element:<Camp/>
  },
  {
    path:"/volunteerform/:campId",
    element:<VolunteerForm/>
  },
  {
    path:"/volunter",
    element:<Volunter/>
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
<RouterProvider router={router}/>
)