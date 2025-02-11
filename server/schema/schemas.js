import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, default: null },
    mobile: { type: String, default: null },
    picture: String,
});
const User = mongoose.model('User', userSchema);

const TripGroupSchema = new mongoose.Schema({
    groupName: { type: String, required: true },
    members: [
        {
            name: String,
            _id: mongoose.Schema.Types.ObjectId 
        }
    ]
});
const TripGroup = mongoose.model("TripGroup", TripGroupSchema);

export { User, TripGroup };