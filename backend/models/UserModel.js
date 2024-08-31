import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
},
{timestamps: true}
)

// we are hasing it pre mean before 
UserSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }

    const hashedPassword = this.password = await bcrypt.hashSync(this.password, 10);
})

// decoding password like this 
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

export const User = mongoose.model("User", UserSchema)