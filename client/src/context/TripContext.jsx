import { createContext, useContext, useEffect, useState } from "react";
import { fetchUserGroups, createTripGroup } from "../api/api.js"; // Import API functions

const TripContext = createContext();

export const TripProvider = ({ children }) => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const loadGroups = async () => {
            const email = localStorage.getItem("userEmail");
            if (!email) return;

            const userGroups = await fetchUserGroups(email);
            setGroups(userGroups);
        };

        loadGroups();
    }, []);

    // ✅ Add group using API
    const addGroup = async (newGroup) => {
        try {
            console.log("New Group: ",newGroup)
            const createdGroup = await createTripGroup(newGroup);
            console.log("Created Group: ",createdGroup)
            setGroups((prevGroups) => [...prevGroups, createdGroup]);
        } catch (error) {
            console.error("Error adding group:", error);
        }
    };

    return (
        <TripContext.Provider value={{ groups, addGroup }}>
            {children}
        </TripContext.Provider>
    );
};

export const useTripGroup = () => useContext(TripContext);
