import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
const guardianSchema = new Schema({
    
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique:true,
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    refreshToken:{
        type:String,
    },
    supervise:{
        type:[
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
},
{
    timestamps:true,
});
export const Guardian= mongoose.model("Guardian", guardianSchema);