import { createBrowserRouter } from "react-router-dom";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/Admin/Dashboard";
import Mahasiswa from "./Pages/Admin/Mahasiswa";
import AdminLayout from "./Layout/AdminLayout";

const RouteList = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },   
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index:true,
                element: <Dashboard />
            },
            {
                path: "mahasiswa",
                element: <Mahasiswa />
            }
        ]
    }
]);

export default RouteList;