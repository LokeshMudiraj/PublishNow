import express from 'express'
import dotenv from "dotenv"
dotenv.config()
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRouter.js';

const app = express();

await connectDB()
// Middlewares
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send("API is working")
})


app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)


app.listen(PORT, ()=>{
    console.log('server is running on the PORT '+ PORT)
})

export default app