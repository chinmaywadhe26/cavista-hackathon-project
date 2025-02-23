import axios from "axios";
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

        
        const mlRequestData = {
            feature1: PainLevels,
            feature2: MobilityIssues,
            feature3: FatigueAppetiteWeight,
            feature4: FatigueAppetiteWeight, 
            feature5: MemoryIssue,
            feature6: ConfusionDisorientation,
            feature7: MoodSwings,
            feature8: SleepPatterns,
            feature9: BreathingProblems,
            feature10: TremorsShaking,
            feature11: NumbnessTingling,
            feature12: FrequencyOfUrination
        };

        console.log(mlRequestData);
        
        let predictionResponse;
        try {
            const mlServerUrl = "http://192.168.31.50:8000/predict";
            const response = await axios.post(mlServerUrl, mlRequestData);
            predictionResponse = response.data; 
        } catch (mlError) {
            console.error("Error sending request to ML model:", mlError);
            return res.status(500).json({ msg: "ML Model Error: Unable to process prediction" });
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
            frequencyOfUrination: FrequencyOfUrination,
            prediction: predictionResponse 
        });

        // await symptoms.save();

        // user.symptomHistory.push(symptoms._id);
        // await user.save();

        return res.status(201).json({ msg: "Symptoms recorded successfully", symptoms, prediction: predictionResponse });

    } catch (error) {
        console.error("Error in Symptom Handler:", error);
        res.status(500).json({ msg: "Server error. Please try again later." });
    }
};
