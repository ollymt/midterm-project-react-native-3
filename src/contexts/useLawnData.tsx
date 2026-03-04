import { useContext, useState, createContext, useEffect } from "react";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LawnContext = createContext();

export const LawnProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // New state

  const fetchApiData = async (isRefreshing = false) => {
    if (isRefreshing) setRefreshing(true);

    try {
      const response = await fetch("https://empllo.com/api/v1");
      const json = await response.json();
      const actualArray = json.jobs || json.data || json;

      // Load saved states
      const savedStates = await AsyncStorage.getItem("savedJobs");
      const savedMap = savedStates ? JSON.parse(savedStates) : {};

      // Create a map of existing items to match by some stable property
      // Since you're generating new UUIDs, you need another way to match jobs
      // Using title+company as a composite key (assuming these don't change)
      const existingSavedMap = {};
      items.forEach((item) => {
        if (item.isSaved) {
          const key = `${item.title}-${item.companyName}`;
          existingSavedMap[key] = true;
        }
      });

      const dataWithUuid = actualArray.map((item) => {
        // Create a composite key to check if this job was saved
        const jobKey = `${item.title}-${item.companyName}`;
        const wasSaved = savedMap[jobKey] || existingSavedMap[jobKey] || false;

        return {
          ...item,
          id: uuid.v4(),
          isSaved: wasSaved, // ✅ Use the saved state from either source
        };
      });

      setItems(dataWithUuid);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const toggleSaved = async (jobId) => {
    setItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === jobId ? { ...item, isSaved: !item.isSaved } : item,
      );

      // Save to AsyncStorage
      saveSavedStates(newItems);

      return newItems;
    });
  };

  const saveSavedStates = async (items) => {
    try {
      const savedMap = {};
      items.forEach((item) => {
        if (item.isSaved) {
          savedMap[item.id] = true;
        }
      });
      await AsyncStorage.setItem("savedJobs", JSON.stringify(savedMap));
    } catch (error) {
      console.error("Error saving saved states:", error);
    }
  };
  
  const loadSavedStates = async () => {
    try {
      const savedStates = await AsyncStorage.getItem("savedJobs");
      if (savedStates) {
        const savedMap = JSON.parse(savedStates);
        setItems((prevItems) =>
          prevItems.map((item) => ({
            ...item,
            isSaved: savedMap[item.id] || false,
          })),
        );
      }
    } catch (error) {
      console.error("Error loading saved states:", error);
    }
  };

  useEffect(() => { 
    loadSavedStates();
    fetchApiData(); 
  }, []);

  return (
    // Pass everything down
    <LawnContext.Provider value={{ items, loading, refreshing, fetchApiData, toggleSaved }}>
      {children}
    </LawnContext.Provider>
  );
};