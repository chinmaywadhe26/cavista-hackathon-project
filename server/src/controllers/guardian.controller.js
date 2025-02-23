import { User } from "../models/user.model.js";
import { Guardian } from "../models/guardian.model.js";
import { Caretaker } from "../models/caretaker.model.js";
const addUser = async (userEmail, guardianEmail) => {
    try {
        const newUser = await User.findOne({email:userEmail});

        if (guardianEmail) {
            const guardian = await Guardian.findOne({ email: guardianEmail });
            if (guardian) {
                guardian.supervise.push(newUser._id);
                await guardian.save();
            }
        }

        return newUser;
    } catch (error) {
        throw new Error("Error creating user: " + error.message);
    }
};

export const addUserController = async (req, res) => {
    try {
        const { userEmail, guardianEmail } = req.body;
        const newUser = await addUser(userEmail, guardianEmail);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error adding user', error: error.message });
    }
};


export const assignCaretaker = async (req, res) => {
    try {
        const { caretakerId, userId, patientId } = req.body;
        const caretaker = await Caretaker.findById(caretakerId);
        const guardian = await Guardian.findById( userId );
        if (!caretaker || !guardian) {
            return res.status(400).json({ msg: "Caretaker or Guardian not found" });
        }
        const patient = await User.findById(patientId);
        if (!patient) {
            return res.status(400).json({ msg: "Patient not found" });
        }

        patient.caretaker = caretaker;
        patient.save();
    }
    catch (error) {
        res.status(500).json({ message: 'Error assigning caretaker', error: error.message });
    }
}



