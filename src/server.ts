import { createServer } from 'http'
import express from 'express'
import config from './config/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes'

const app = express()
const httpServer = createServer(app)

const corsOptions = {
    origin: true,
    credentials: true
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors(corsOptions))

// corsPolicy
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://suspicious-lamarr-6e5790.netlify.app')
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,OPTIONS,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-headers', 'X-Requested-With,Content-Type')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
})

// middleware
app.use((req,res,next) => {
    console.log(`METHOD: ${ req.method } URL: ${ req.url }`)
    next()
})


// routes
app.use('/api', routes.userRoutes)
app.use('/api/blog', routes.blogRoutes)


// error
app.use((req,res,)=> {
    res.status(404).json({ error: 'Not Found' })
})

mongoose   
    .connect(`${config.mongo.url}`,config.mongo.options)
    .then(() => console.log(`DATABASE CONNECTED`))
    .catch((err) => console.log(err, 'Network Error'))

httpServer.listen(config.server.port, () => console.log(`Server: ${ config.server.host }:${ config.server.port }`))