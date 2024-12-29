import React from 'react';
import { Link } from 'react-router-dom';

function Sider() {
return (
    <aside className="bg-indigo-900 text-white w-56">
        <div className="px-4 mt-2">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <nav className="ml-4 mt-4">
            <ul>
            <Link to="/admin" ><li className="hover:bg-indigo-600 p-2 rounded">Dashboard</li></Link>
            <Link to="/admin/mahasiswa" ><li className="hover:bg-indigo-600 p-2 rounded">Mahasiswa</li></Link>
            </ul>
            </nav>
        </div>
    </aside>
);
}

export default Sider;
