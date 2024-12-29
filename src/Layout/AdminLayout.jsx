import { Outlet } from 'react-router-dom';
import Header  from '../Component/Header';
import Sider from '../Component/Sider';

function AdminLayout() {
    return(
        <div className="bg-gray-100">
            <div className='flex flex-row min-h-screen'>
                <Sider />
                <div className='flex flex-col flex-1'>
                    <Header />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default AdminLayout