import express from 'express'

const router = express.Router()

router.get('/', (req, res)=> {
    console.log('router work')

    res.status(200).json({
        massage:"success",
    })
})

export default router