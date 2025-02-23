import mongoose,{Schema} from "mongoose";

const symptomsSchema = new Schema({
    painLevels: { type: Number, required: true },
    mobilityIssues: { type: Number, required: true },
    fatigue: { type: Number, required: true },
    appetiteWeight: { type: Number, required: true },
    memoryIssue: { type: Number, required: true },
    confusionDisorientation: { type: Number, required: true },
    moodSwings: { type: Number, required: true },
    sleepPatterns: { type: Number, required: true },
    breathingProblems: { type: Number, required: true },
    tremorsShaking: { type: Number, required: true },
    numbnessTingling: { type: Number, required: true },
    frequencyOfUrination: { type: Number, required: true }
});

export const Symptoms = mongoose.model("Symptoms", symptomsSchema);
