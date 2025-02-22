import { Symptoms } from "../models/symptoms.model.js";
import { User } from "../models/user.model.js";

export const fillSymptoms = async (req, res) => {
    try {
        const {
            PainLevels,
            MobilityIssues,
            FatigueAppetiteWeight,
            MemoryIssue,
            ConfusionDisorientation,
            MoodSwings,
            SleepPatterns,
            BreathingProblems,
            TremorsShaking,
            NumbnessTingling,
            FrequencyOfUrination,
            userName
        } = req.body;

        
        const user = await User.findOne({ username: userName });
        if (!user) {
            return res.status(400).json({ msg: "Cannot find user. Please enter correct username." });
        }

        const symptoms = new Symptoms({
            painLevels: PainLevels,
            mobilityIssues: MobilityIssues,
            fatigue: FatigueAppetiteWeight,
            appetiteWeight: FatigueAppetiteWeight,
            memoryIssue: MemoryIssue,
            confusionDisorientation: ConfusionDisorientation,
            moodSwings: MoodSwings,
            sleepPatterns: SleepPatterns,
            breathingProblems: BreathingProblems,
            tremorsShaking: TremorsShaking,
            numbnessTingling: NumbnessTingling,
            frequencyOfUrination: FrequencyOfUrination
        });

        //need to integrate ML model with the data recieved
        // Send this to ML server , which will tell if should go to doctor.
        await symptoms.save();

        user.symptomHistory.push(symptoms._id);
        await user.save();


        return res.status(201).json({ msg: "Symptoms recorded successfully", symptoms });
    } catch (error) {
        console.error("Error in Symptom Handler:", error);
        res.status(500).json({ msg: "Server error. Please try again later." });
    }
};