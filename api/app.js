import express, { json } from  'express'
import cors from "cors"
import cookieParser from 'cookie-parser'
import postRoute from './routes/post.route.js'
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
import testRoute from './routes/test.route.js'
const app = express()
const port = 4100


app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:process.env.CLIENT_URL , credentials:true}))

app.use("/api/post",postRoute)
app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/test",testRoute)

app.listen(port, ()=>{
    console.log('listening on port', port)
})