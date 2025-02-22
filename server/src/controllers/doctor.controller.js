import { Doctor } from '../models/doctor.model.js';
import { User } from '../models/user.model.js';
import { Prescription } from '../models/prescription.model.js';

export const getPatientHistory = async (req, res) => {
    try {
        const { doctorId, patientId } = req.params;

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ msg: "Doctor not found" });
        }

        const patient = await User.findById(patientId).populate('symptomHistory');
        if (!patient) {
            return res.status(404).json({ msg: "Patient not found" });
        }

        res.status(200).json({ symptomHistory: patient.symptomHistory });
    } catch (error) {
        console.error("Error fetching patient history:", error);
        res.status(500).json({ msg: "Server error. Please try again later." });
    }
};

export const addPrescription = async (req, res) => {
    try {
        const { doctorId, patientId, details } = req.body;

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ msg: "Doctor not found" });
        }

        const patient = await User.findById(patientId);
        if (!patient) {
            return res.status(404).json({ msg: "Patient not found" });
        }

        const prescription = new Prescription({
            patient: patientId,
            doctor: doctorId,
            details,
        });

        await prescription.save();

        res.status(201).json({ msg: "Prescription added successfully", prescription });
    } catch (error) {
        console.error("Error adding prescription:", error);
        res.status(500).json({ msg: "Server error. Please try again later." });
    }
};