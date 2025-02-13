import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, default: null },
    phone: { type: String, default: null },
    picture: { type: String, default: null },
});
const User = mongoose.model("User", userSchema);

const TripGroupSchema = new mongoose.Schema({
    groupName: { type: String, required: true },
    members: [
        {
            name: String,
            email: String,
            _id: mongoose.Schema.Types.ObjectId,
        },
    ],
});
const TripGroup = mongoose.model("TripGroup", TripGroupSchema);

export { User, TripGroup };
