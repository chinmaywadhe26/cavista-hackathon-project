import {Doctor} from '../models/doctor.model';
import {Patient} from '../models/patient.model';
import {Caretaker} from '../models/caretaker.model';
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


