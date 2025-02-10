import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, default: null },
    mobile: { type: String, default: null },
    picture: String,
});

const User = mongoose.model('User', userSchema);

export default User;