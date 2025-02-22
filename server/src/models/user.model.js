import mongoose, {Schema, SchemaTypes} from "mongoose";

import jwt from "jsonwebtoken";
const userSchema = new Schema({
    guardianEmail:{
        type:String
    },
    username:{
        type: String,
        // required: true,
        lowercase: true,
        unique:true,
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique:true,
    },
    password:{
        type: String,
        required: true,
    },
    refreshToken:{
        type:String,
    },
    caretaker :{
        type: Schema.Types.ObjectId,
        ref:'Caretaker'
    },
    symptomHistory:{
        type: [
            {type:Schema.Types.ObjectId,
                ref:'Symptoms' 
            }
        ]
    
    },
    date:{
        type:[
            {
                date:Date,
                // symptoms:{
                //     type:Schema.Types.ObjectId,
                //     ref:'Symptoms'
                // }
            }
        ]
    }
},
{
    timestamps:true,
});

/*
userSchema.methods.genereateAccessTokens=function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.genereateRefreshTokens=function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
} */
export const User= mongoose.model("User", userSchema);
