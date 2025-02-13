import React, { useEffect, useState } from "react";
import { useTripGroup } from "../context/TripContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
    const { groups = [], refreshGroups } = useTripGroup();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const userEmail = jwtDecode(sessionStorage.getItem("jwtToken")).email;

    useEffect(() => {
        const loadGroups = async () => {
            setLoading(true); // Ensure loading state is active
            await refreshGroups();
            setLoading(false); // Set loading to false only after fetching groups
        };
        loadGroups();
    }, []);
    

    const userGroups = groups.filter(group =>
        Array.isArray(group.members) && group.members.some(m => m.email === userEmail)
    );
    console.log("User Groups: ",userGroups)

    useEffect(() => {
        if (!loading && userGroups.length === 0) {
            navigate("/create-trip");
        }
    }, [loading, userGroups, navigate]);

    return (
        <div className="container">
            {loading ? (
                <div className="loader">
                    <div className="video">
                        <video autoPlay loop muted width="200">
                            <source src="/images/flight_loader.webm" type="video/webm" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="desc h4">
                        Hold On! Wait a Sec........
                    </div>

                </div>
            ) : userGroups.length > 0 ? (
                <>
                    <h2>Your Trip Groups</h2>
                    <ul>
                        {userGroups.map((group) => (
                            <li key={group._id} onClick={() => navigate(`/group/${group._id}`)}>{group.groupName}</li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>No trip groups found.</p>
            )}
        </div>
    );
};

export default Dashboard;
