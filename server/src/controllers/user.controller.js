






export const registerUser = async (req,res )=>{
    try {
        const {email,password,phoneNumber} = req.body;
        if(!email||!password||!phoneNumber){
            return res.status(400).json({message:"All fields are required"});
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        const newUser = await User.create({
            email,
            password,
            phoneNumber 
        })
        

    } catch (error) {
        console.log("Error in register controller",error);
        res.status(500).json({message:"Internal Server Error"});
        
    }
}