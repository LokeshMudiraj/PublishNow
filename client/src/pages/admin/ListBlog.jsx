import React, { useEffect } from 'react'
import { useState } from 'react'
import { assets, blog_data } from '../../assets/assets';
import BlogTableBody from '../../components/admin/BlogTableBody';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ListBlog = () => {
    const {axios} = useAppContext()
    const [blogs, setBlogs] = useState([]);
    const fetchBlogs = async () => {
        try {
          const {data} = await axios.get('/api/admin/blogs')
          if(data.success){
            setBlogs(data.blogs)
          }else{
            toast.error(data.message)
          }
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        fetchBlogs()
    }, [])
    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
            <h1 className="text-xl font-semibold text-gray-700">All Blogs</h1>

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
                            {blogs.map((blog, index) => (
                                <BlogTableBody
                                    key={blog._id}
                                    blog={blog}
                                    fetchBlogs={fetchBlogs}
                                    index={index + 1}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

    )
}

export default ListBlog
