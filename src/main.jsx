import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RouteList from './RouteList.jsx'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={RouteList}  />
  </StrictMode>,
)