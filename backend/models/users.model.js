import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["admin", "customer"],
        default: "customer"
    }
}, {timestamps: true});

// hash password before save
userSchema.pre("save", async function () {
    if(!this.isModified("password")){
        return;
    }


    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
});

// compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}

// create user model
export const User = mongoose.model('User', userSchema);



