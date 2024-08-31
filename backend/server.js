import express from 'express'
import dotenv from 'dotenv'
import {notFound, errorHandler} from './middlewares/errorMiddleware.js'
import AuthRoutes from './routes/AuthRoutes.js'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
dotenv.config()
const port = process.env.PORT


connectDB()
// middlewares
const app = express();
app.use(express.json())
app.use(cookieParser())



// just for check
app.get('/' , (req, res)=>{
    res.send("Welcome home")
})



//routes

app.use('/api/users', AuthRoutes)


app.use(errorHandler);
app.use(notFound);

// server setting with port
app.listen(port, ()=>{
    console.log(`App is connect with port${port}`)
})