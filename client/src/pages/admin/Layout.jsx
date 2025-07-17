import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from '../../components/admin/SideBar';
import { useAppContext } from '../../context/AppContext';


const Layout = () => {


  const { axios, setToken, navigate } = useAppContext()
  const logout = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null
    setToken(null)
    navigate('/')
  }
  return (
    <>
      <div className='flex items-center justify-between py-2 h-[80px] px-4 sm:px-12 border-b border-gray-100'>
        <img src={assets.logo_transparent} alt=""
          className='w-32 mt-8 mb-8 sm:w-40 cursor-pointer'
          onClick={() => navigate('/')} />
        <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Logout</button>
      </div>
      <div className='flex h-[calc(100vh-75px)]'>
        <SideBar />
        <Outlet />
      </div>
    </>
  )
}

export default Layout
