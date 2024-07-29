import jwt from "jsonwebtoken"

export const shouldBeLoggedIn = (req , res)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({message:"Not Authenticated"});
    }

    jwt.verify(token,process.env.JWT_SECRET_KEY ,async (err, payload)=>{
        if(err) return res.status(403).json({message:"Token is invalid"});

    })

    res.status(200).json({message:"Token is valid you are authenticated"});
}
export const shouldBeAdmin = (req , res)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({message:"Not Authenticated"});
    }

    jwt.verify(token,process.env.JWT_SECRET_KEY ,async (err, payload)=>{
        if(err) return res.status(403).json({message:"Token is invalid"});

        if(!payload.isAdmin) return res.status(403).json({message:"You are not Authorized"});

    })

    res.status(200).json({message:"Token is valid you are authenticated"});
}