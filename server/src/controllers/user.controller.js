import {Caretaker} from "../models/caretaker.model.js";
import {Doctor} from "../models/doctor.model.js";
import  {Guardian}  from "../models/guardian.model.js";
import {User} from "../models/user.model.js";
import bcrypt from "bcrypt";    



const registerCareTaker  = async (email,password,phoneNumber)=>{
    try {
        const hashedPassword = await bcrypt.hash(password,10);
        const caretaker = new Caretaker({
            email,
            password:hashedPassword,
            phoneNumber,
            rating:0,
            patients:[],
        });
        const savedCaretaker = await caretaker.save();
        return savedCaretaker;
    } catch (error) {
        console.log("Error in registerCareTaker",error);
        return null;
    }
}


const registerDoctor = async (email,password,phoneNumber)=>{
    try {
        const hashedPassword = await bcrypt.hash(password,10);
        const doctor = new Doctor({
            email,
            password:hashedPassword,
            phoneNumber,
            rating:0,
            patients:[],
        });
        const savedDoctor = await doctor.save();
        return savedDoctor;
    } catch (error) {
        console.log("Error in registerDoctor",error);
        return null;
    }
}

const registerPatient = async (email,password,phoneNumber)=>{
    try {
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({
            email,
            password:hashedPassword,
            phoneNumber,
            rating:0,
            doctors:[],
        });
        const savedUser = await user.save();
        return savedUser;
    } catch (error) {
        console.log("Error in registerUser",error);
        return null;
    }
}
const registerGuardian = async (email,password,phoneNumber)=>{
    try {
        const hashedPassword = await bcrypt.hash(password,10);
        const guardian = new Guardian({
            email,
            password:hashedPassword,
            phoneNumber,
            supervise:[],
        });
        const savedGuardian = await guardian.save();
        return savedGuardian;
    } catch (error) {
        console.log("Error in registerGuardian",error);
        return null;
    }
}

export const registerUser = async (req,res )=>{
    try {
        const {role,email,password,phoneNumber} = req.body;
        console.log("inside user");
        if(!email||!password||!phoneNumber){
            return res.status(400).json({message:"All fields are required"});
        }
        switch (role) {
            case "caretaker":
                registerCareTaker(email,password,phoneNumber);
                break;
            case "doctor":
                registerDoctor(email,password,phoneNumber);
                break;
            case "user":
                registerPatient(email,password,phoneNumber);
                break;
            case "guardian":
                registerGuardian(email,password,phoneNumber);
                break;
            default:
                res.status(400).json({message:"Invalid role"});
        }
        
        res.status(200).json({message:"User registered successfully"});
    } catch (error) {
        console.log("Error in register controller",error);
        res.status(500).json({message:"Internal Server Error"});
        
    }
}
export const loginUser = async (req,res )=>{
    try {
        const {role,email,password} = req.body;
        if(!email||!password){
            return res.status(400).json({message:"All fields are required"});
        }   
        let user;
        switch (role) {
            case "caretaker":
                user = await CareTaker.findOne({email});
                break;
            case "doctor":
                user = await Doctor.findOne({email});
                break;
            case "user":
                user = await User.findOne({email});
                break;
            case "guardian":
                user = await Guardian.findOne({email});
                break;
            default:
                res.status(400).json({message:"Invalid role"});
        }
        if(!user){
            return res.status(400).json({message:"Invalid email or password"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid email or password"});
        }
        // const accessToken = user.generateAccessToken();
        // const refreshToken = user.generateRefreshToken();
        // user.refreshToken = refreshToken;
        // await user.save();
        // res.cookie("refreshToken",refreshToken,{httpOnly:true});

    } catch (error) {
        console.log("Error in login controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}