import fs from 'fs'
import Blog from '../models/Blog.js';
import imagekit from '../configs/Imagekit.js';
import Comment from '../models/comment.js';
import main from '../configs/gemini.js'
export const addBlog = async (req,res) => {
    try {
        const {title, subTitle,description, category, isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;
        // Checking if all the feilds are available
        if(!title || !description || !category || !imageFile){
            return res.json({success: false, message: "Missing required fields"})
        }
        // Upload the images to the Imagekit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file : fileBuffer,
            fileName : imageFile.originalname,
            folder : "/blogs"
        })
        // optimization through the Imagekit
        const optimizedImageURL = imagekit.url({
            path : response.filePath,
            transformation:[
                {quality: 'auto'}, // Auto compression
                {format: 'webp'}, // Convert modern Format
                {width: '1280'} // Adjust the width
            ]
        })
        const image = optimizedImageURL;
        await Blog.create({title, subTitle, description, category, image, isPublished})

        res.json({success : true, message: "Blog added succesfully"})
    } catch (error) {
        res.json({success : false, message: error.message})
    }
}

export const getAllBlogs = async (req,res) => {
    try {
        const blogs = await Blog.find({isPublished : true})
        res.json({success: true , blogs})
    } catch (error) {
        res.json({success : false, message: error.message}) 
    }
}

export const getBlogByID = async (req, res) =>{
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId)
        if(!blog){
            return res.json({success: false, message:"Blog not found"})
        }
        res.json({success: true, blog})
    } catch (error) {
        res.json({success: false, message: error.message})
    }

}
export const deleteBlogById = async (req,res)  => {
    try {
        const {id} = req.body;
        await Blog.findByIdAndDelete(id)

        await Comment.deleteMany({blog: id})
        res.json({success: true, message: "Blog deleted successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const togglePublish = async (req,res) =>{
    try {
        const {id} = req.body;
        const blog = await Blog.findById(id)
        blog.isPublished = !blog.isPublished
        await blog.save();
        res.json({success: true, message: "Blog status updated successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const addComment = async (req,res) =>{
    try {
        const {blog,name,content} = req.body
        await Comment.create({blog, name, content})
        res.json({success: true, message: "Comment sent for review"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getBlogsComments = async(req,res) =>{
    try{
        const {blogId} = req.body;
        const comments = await Comment.find({blog: blogId,isApproved:true}).sort
        ({createdAt: -1})
        res.json({success: true, comments})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const generateContent = async (req,res)=>{
      try {
        const {prompt} = req.body
        const content = await main(prompt + 'Generate a blog content for this topic in simple text format')
        res.json({success: true,content} )
      } catch (error) {
        res.json({success: false,message: error.message} )
      }
}