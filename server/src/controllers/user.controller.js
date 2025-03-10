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
        let result;
        switch (role) {
            case "caretaker":
                result =  registerCareTaker(email,password,phoneNumber);
                break;
            case "doctor":
                result =  registerDoctor(email,password,phoneNumber);
                break;
            case "user":
                result =  registerPatient(email,password,phoneNumber);
                break;
            case "guardian":
                result =  registerGuardian(email,password,phoneNumber);
                break;
            default:
                return res.status(400).json({message:"Invalid role"});
        }
        
        if (result) {
            res.status(200).json({message:"User registered successfully"});
        } else {
            res.status(500).json({message:"Registration failed"});
        }
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
                user = await Caretaker.findOne({email});
                break;
            case "doctor":
                user = await Doctor.findOne({email});   
                break;
            case "user":
                user = await User.findOne({email});
                break;
            case "guardian":
                user = await Guardian.findOne({email});
                // console.log(user);
                // console.log("guardian found")
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

        return res.status(200).json({
            message:"logged in"
        });
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
export const createRoom = async(req, res) => {
    try{
        console.log("here");
        const {user, role, hash} = req.body;
        console.log(req.body);

        if(role==='patient'){
            const findUser = await User.findOne({_id:user._id});
            if(!findUser){
                return res.status(400).json({message: "User not found"});
            }
            findUser.room = hash;
            findUser.save();    
        }
        else if(role==='caretaker'){
            const findCaretaker = await Caretaker.findOne({_id:user._id});
            if(!findCaretaker){
                return res.status(400).json({message: "User not found"});
            }
            findCaretaker.room = hash;
            findCaretaker.save();
        }
        else if(role==='guardian'){
            const findGuardian = await Guardian.findOne({_id:user._id});
            if(!findGuardian){
                return res.status(400).json({message: "User not found"});
            }
            findGuardian.room = hash;
            findGuardian.save();
        }
        else if(role==='doctor'){ 
            const findDoctor = await Doctor.findOne({_id:user._id});
            if(!findDoctor){
                return res.status(400).json({message: "User not found"});
            }
            findDoctor.room = hash;
            findDoctor.save();
        }
        else{
            return res.status(400).json({message: "Invalid role"});
        }
        
        return res.status(201).json({message:"Room created Successfully"});

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const deleteRoom = async(req, res) => {
    try{
        const {hash,role} = req.body;
        let findUser;
        if(role==='patient'){
            findUser = await User.findOne({_id:user._id});
        }
        else if(role==='caretaker'){
            findUser = await Caretaker.findOne({_id:user._id});
        }
        else if(role==='guardian'){
            findUser = await Guardian.findOne({_id:user._id});
        }
        else if(role==='doctor'){ 
            findUser = await Doctor.findOne({_id:user._id});
        }
        else{
            return res.status(400).json({message: "Invalid role"});
        }
        if(!findUser){
            return res.status(400).json({message: "User not found"});
        }
        findUser.room = null;
                findUser.save();
        
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
}
export const getAllUsers = async(req, res) => {
    try{
        const users = await User.find().populate('caretaker').populate('symptomHistory');
        console.log(users);
        return res.status(200).json({users});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}