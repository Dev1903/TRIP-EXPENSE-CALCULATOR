import { createContext, useContext, useEffect, useState } from "react";
import { fetchUserGroups, createTripGroup } from "../api/api.js"; // Import API functions
import { jwtDecode } from "jwt-decode";

const TripContext = createContext();

export const TripProvider = ({ children }) => {
    const [groups, setGroups] = useState([]);


    // Function to load groups
    const refreshGroups = async () => {
        const email = jwtDecode(sessionStorage.getItem("jwtToken")).email;
        console.log("Trip COntext Email: ", email)
        if (!email) return;
        
        try {
            const userGroups = await fetchUserGroups(email);
            setGroups(userGroups);
        } catch (error) {
            console.error("Error fetching user groups:", error);
        }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        refreshGroups();
    }, []);

    // ✅ Add group using API and refresh groups
    const addGroup = async (newGroup) => {
        try {
            await createTripGroup(newGroup);

            await refreshGroups(); // Refresh the groups after creation
        } catch (error) {
            console.error("Error adding group:", error);
        }
    };

    return (
        <TripContext.Provider value={{ groups, addGroup, refreshGroups }}>
            {children}
        </TripContext.Provider>
    );
};

export const useTripGroup = () => useContext(TripContext);
