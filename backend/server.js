import express from 'express'
import "dotenv/config.js"
import cookieParser from 'cookie-parser'
import cors from "cors"
import connectDB from "./db/db.config.js"
import {app, server } from './lib/socket.js'

const port =process.env.PORT || 5001 

//CORS configuration
const corsOptions = {
    origin: ['https://chat-app-blush-phi.vercel.app'], // Replace with your frontend URL
    credentials: true
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))



// routers
import authroute from './routes/auth.route.js'
import messageroute from './routes/message.route.js'



app.use('/api/auth',authroute)
app.use('/api/messages',messageroute)


server.listen(port, () => {
        console.log(`i am listening on ${port}`)
        connectDB()
})
