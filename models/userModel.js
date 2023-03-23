import mongoose from "mongoose";

//! Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        select:false,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});

export const User = mongoose.model('User', userSchema);
