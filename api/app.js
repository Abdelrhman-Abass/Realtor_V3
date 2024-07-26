import express, { json } from  'express'
import postRoute from './routes/post.route.js'
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
const app = express()
const port = 4100


app.use(express.json())
app.use("/api/posts",postRoute)
app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)

app.listen(port, ()=>{
    console.log('listening on port', port)
})