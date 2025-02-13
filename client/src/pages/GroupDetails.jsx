import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGroupById } from "../api/api.js"; // Assume this API call fetches group details

const GroupDetails = () => {
    const { groupId } = useParams();
    const [group, setGroup] = useState(null);

    useEffect(() => {
        const getGroupDetails = async () => {
            try {
                const data = await fetchGroupById(groupId);
                setGroup(data);
            } catch (error) {
                console.error("Error fetching group details:", error);
            }
        };

        getGroupDetails();
    }, [groupId]);

    return (
        <div className="container">
            {group ? (
                <>
                    <h2>{group.groupName}</h2>
                    <h4>Members:</h4>
                    <ul>
                        {group.members.map((member) => (
                            <li key={member._id}>{member.name} - {member.email}</li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Loading group details...</p>
            )}
        </div>
    );
};

export default GroupDetails;
