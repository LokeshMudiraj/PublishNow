import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';


const BlogTableBody = ({ blog, fetchBlogs, index }) => {
    const { title, createdAt } = blog;
    const BlogDate = new Date(createdAt)

    const { axios } = useAppContext()

    const deleteBlog = async () => {
        const confirm = window.confirm('Are you sure you want to delete this Blog?')
        if (!confirm) {
            return;
        } else {
            try {
                const { data } = await axios.post('/api/blog/delete', { id: blog._id })
                if (data.success) {
                    toast.success(data.message)
                    await fetchBlogs()
                    
                } else {
                    toast.error(data.message)
                }

            } catch (error) {
                toast.error(error.message)
            }
        }
    }
    const togglePublish = async()=>{
         try {
            const { data } = await axios.post('/api/blog/toggle-publish', { id: blog._id })
                   if (data.success) {
                       toast.success(data.message)
                       await fetchBlogs()
                   } else {
                       toast.error(data.message)
                   }
         } catch (error) {
             toast.error(error.message)
         }

    }
    return (
        <tr className='border-y border-gray-300'>
            <th className='px-2 py-4'>{index}</th>
            <td className='px-2 py-4'>{title}</td>
            <td className='px-2 py-4 max-sm:hidden'>{BlogDate.toDateString()}</td>
            <td className='px-2 py-4 max-sm:hidden'>
                <p className={`${blog.isPublished ? "text-green-600" : "text-orange-700"}`}>{blog.isPublished ? 'Published' : 'Unpublished'}</p>
            </td>
            <td className='px-2 py-4 flex text-xs gap-3'>
                <button onClick={togglePublish} className='border px-2 py-0.5 mt-1 rounded cursor-pointer '>{blog.isPublished ? 'Unpublished' : 'Published'}</button>
                <img onClick={deleteBlog} src={assets.cross_icon} alt="" className='w-8 hover:scale-110 transition-all cursor-pointer' />
            </td>

        </tr>
    )
}

export default BlogTableBody
