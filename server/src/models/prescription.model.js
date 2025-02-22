
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
const prescriptionSchema  = new Schema({
    patient:{
        type: Schema.Types.ObjectId,
        requeired:true,
    },
    doctor:{
        type: Schema.Types.ObjectId,
        required:true,
    },
    details:{
        type: String,
        required:true,
    },
},
    {
        timestamps: true,
    });

export const Prescription = mongoose.model("Prescription", prescriptionSchema);

