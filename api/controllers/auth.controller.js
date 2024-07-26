import bcrypt from "bcrypt";


export const register = async (req ,res) =>{

    const {email , username , password} = req.body

    // HASH THE PASSWORD
    const hashPassword = await bcrypt.hash(password,12)
    console.log(hashPassword)

    // CREATE A NEW USER AND SAVE IT TO DB
    
}
export const login = (req ,res) =>{
    console.log('login route')

    res.json({
        massage:"success",
    })

}
export const logout = (req ,res) =>{
    console.log('logout route')

}