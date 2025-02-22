
import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
const doctorSchema = new Schema({
    
    username:{
        type: String,
        required: true,
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
     patients: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]

    },

    refreshToken:{
        type:String,
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
}
  */
export const Doctor = mongoose.model("Doctor", doctorSchema);

