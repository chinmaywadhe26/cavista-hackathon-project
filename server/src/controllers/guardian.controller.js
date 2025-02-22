import { User } from "../models/user.model";
import { Guardian } from "../models/guardian.model";
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