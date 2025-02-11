import React from "react";
import { useTripGroup } from "../context/TripContext";
import TripGroupPage from "./TripGroupPage";

const Dashboard = ({ userEmail }) => {
  const { groups = [] } = useTripGroup();  // Ensure groups is never undefined

//   if (!userEmail) {
//     return <p>Error: No user email provided.</p>;
//   }

  const userGroups = groups.filter((group) =>
    Array.isArray(group.members) && group.members.some((m) => m.email === userEmail)
  );

  return (
    <div className="container">
      {userGroups.length > 0 ? (
        <>
          <h2>Your Trip Groups</h2>
          <ul>
            {userGroups.map((group, index) => (
              <li key={index}>{group.name}</li>
            ))}
          </ul>
        </>
      ) : (
        <TripGroupPage />
      )}
    </div>
  );
};

export default Dashboard;
