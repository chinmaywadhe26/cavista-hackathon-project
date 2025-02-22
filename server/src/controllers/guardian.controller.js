import { User } from "../models/user.model";
import { Guardian } from "../models/guardian.model";
const addUser = async (user, guardianEmail) => {
    try {
        const newUser = new User(user);
        await newUser.save();

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
        const { user, guardianEmail } = req.body;
        const newUser = await addUser(user, guardianEmail);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error adding user', error: error.message });
    }
};