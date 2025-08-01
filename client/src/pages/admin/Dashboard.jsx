import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets'
import BolgTableBody from '../../components/admin/BlogTableBody'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: []
    })

    const { axios} = useAppContext()
    const fetchDashboard = async () => {
        try{
            const {data} = await axios.get('/api/admin/dashboard')
            data.success ? setDashboardData(data.dashboardData) : toast.error(data.message)
        }catch(error){
            toast.error(error.message)
        }
    }
    useEffect(() => {
        fetchDashboard()
    }, [])
    return (
        <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
            <div className='flex flex-wrap gap-4 '>
                <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                    <img src={assets.dashboard_icon_1} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashboardData.blogs}</p>
                        <p className='text-gray-400 font-light'>Blogs</p>
                    </div>
                </div>
                <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                    <img src={assets.dashboard_icon_2} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashboardData.comments}</p>
                        <p className='text-gray-400 font-light'>Comments</p>
                    </div>
                </div>
                <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                    <img src={assets.dashboard_icon_3} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashboardData.drafts}</p>
                        <p className='text-gray-400 font-light'>Drafts</p>
                    </div>
                </div>
            </div>
            <div>
                <div className='flex items-center gap-3 m-4 mt-6 text-grya-600'>
                    <img src={assets.dashboard_icon_4} alt="" />
                    <p>Latest Blogs</p>
                </div>
                <div className='mt-4 max-w-6xl h-4/5 overflow-hidden rounded-lg shadow bg-white'>
                    <div className='h-full overflow-y-scroll pr-2'>
                        <table className='w-full text-sm text-gray-600'>
                            <thead className='text-xs text-gray-700 text-left uppercase sticky top-0 bg-white z-10'>
                                <tr>
                                    <th className='px-2 py-4 xl:px-6'>#</th>
                                    <th className='px-2 py-4'>Blog Title</th>
                                    <th className='px-2 py-4 max-sm:hidden'>Date</th>
                                    <th className='px-2 py-4 max-sm:hidden'>Status</th>
                                    <th className='px-2 py-4'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {dashboardData.recentBlogs.map((blog, index) => {
                                    return <BolgTableBody key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1} />
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
