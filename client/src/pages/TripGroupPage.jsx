import React, { useState } from "react";
import { useTripGroup } from "../context/TripContext";
import Notiflix from "notiflix";

const TripGroupPage = () => {
  const { addGroup } = useTripGroup();
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleAddMember = () => {
    if (!email || !name) {
      Notiflix.Notify.failure("Enter both name and email!");
      return;
    }
    setMembers([...members, { email, name }]);
    setEmail("");
    setName("");
  };

  const handleCreateGroup = () => {
    if (!groupName || members.length === 0) {
      Notiflix.Notify.failure("Enter group name & add at least one member!");
      return;
    }
    addGroup({ groupName: groupName, members });
    Notiflix.Report.success("Group Created", "Your trip group is ready!", "OK");
    setGroupName("");
    setMembers([]);
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
          <li key={index}>{m.name} ({m.email})</li>
        ))}
      </ul>
      <button onClick={handleCreateGroup}>Create Group</button>
    </div>
  );
};

export default TripGroupPage;
