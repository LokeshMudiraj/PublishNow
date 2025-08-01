import express from 'express'
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogByID, getBlogsComments, togglePublish } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router();

blogRouter.post("/add", auth, upload.single('image'), addBlog);

blogRouter.get('/all', getAllBlogs)
blogRouter.get('/:blogId', getBlogByID)
blogRouter.post('/delete', auth, deleteBlogById)
blogRouter.post('/toggle-publish', auth, togglePublish)

blogRouter.post('/add-comment', addComment)
blogRouter.post('/comments', getBlogsComments)

blogRouter.post('/generate', auth, generateContent)

export default blogRouter