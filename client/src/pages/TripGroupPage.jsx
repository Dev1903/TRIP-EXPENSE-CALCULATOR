import React, { useState } from "react";
import { useTripGroup } from "../context/TripContext";
import Notiflix from "notiflix";
import { useNavigate } from "react-router-dom";
import { fetchUserByEmail, createTripGroup } from "../api/api.js";
import { jwtDecode } from "jwt-decode";

const TripGroupPage = () => {
    const { refreshGroups } = useTripGroup();
    const [groupName, setGroupName] = useState("");
    const [members, setMembers] = useState([]);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleAddMember = async () => {
        if (!email || !name) {
            Notiflix.Notify.failure("Enter both name and email!");
            return;
        }

        try {
            const user = await fetchUserByEmail(email);
            if (user) {
                setMembers([...members, { _id: user._id, email: user.email, name: name }]);
                setEmail("");
                setName("");
                Notiflix.Notify.success("Member added successfully!");
            } else {
                Notiflix.Notify.failure("User not found!");
            }
        } catch (error) {
            Notiflix.Notify.failure("Failed to fetch user.");
        }
    };

    const handleCreateGroup = async () => {
        if (!groupName || members.length === 0) {
            Notiflix.Notify.failure("Enter group name & add at least one member!");
            return;
        }

        try {
            // Fetch current user from JWT
            const currentUser = jwtDecode(sessionStorage.getItem("jwtToken"));
            console.log("CURRENT USER:", currentUser);

            if (!currentUser || !currentUser._id) {
                Notiflix.Notify.failure("User authentication failed!");
                return;
            }

            const groupData = {
                groupName,
                members: [...members, { _id: currentUser._id, email: currentUser.email, name: currentUser.name }]
            };

            console.log("Group Data:", groupData);

            await createTripGroup(groupData);
            Notiflix.Report.success(
                "Welcome!",
                "Your trip group is ready!",
                "Proceed",
                () => {
                    refreshGroups();
                    navigate("/dashboard");
                }
            );

            setGroupName("");
            setMembers([]);
        } catch (error) {
            Notiflix.Notify.failure("Failed to create group.");
        }
    };

    return (
        <div className="container">
            <h2>Create a Trip Group</h2>
            <input type="text" placeholder="Group Name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
            <div>
                <input type="text" placeholder="Member Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Member Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button onClick={handleAddMember}>Add Member</button>
            </div>
            <ul>
                {members.map((m, index) => (
                    <li key={index}>{m.name}</li>
                ))}
            </ul>
            <button onClick={handleCreateGroup}>Create Group</button>
        </div>
    );
};

export default TripGroupPage;
