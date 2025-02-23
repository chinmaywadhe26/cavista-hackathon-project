import {Doctor} from '../models/doctor.model.js';
import {Caretaker} from '../models/caretaker.model.js';
import { User } from '../models/user.model.js';
export const assignDoctor = async (req,res,next)=>{
    try{
        const {doctorId,patientId} = req.body;
        const doctor = await Doctor.findById(doctorId);
        const patient = await Patient.findById(patientId);
        if(!doctor || !patient){
            return res.status(400).json({msg:"Doctor or Patient not found"});
        }
        doctor.patients.push(patientId);
        patient.doctor = doctorId;
        await doctor.save();
        await patient.save();
        res.status(200).json({msg:"Doctor assigned successfully"});
        
    } catch(error){
        next(error);
    }
}

export const getAllcaretakers = async(req,res,next)=>{
    try{
        const caretakers = await Caretaker.find();
        res.status(200).json({caretakers});
    }catch(error){
        next(error);
    }
}

export const getCaretaker = async(req,res,next)=>{
    try{
        console.log("here");
        const {userId} = req.body;
        const caretaker = await User.findOne({email:userId}).populate('caretaker');
        console.log("Caretaker",caretaker);
        return res.status(200).json({caretaker: caretaker.caretaker});
    }
    catch(error){
        return res.status(400).json({msg:"Failed to fetch caretaker"});
    }
}

