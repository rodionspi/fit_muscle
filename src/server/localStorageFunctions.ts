import User from "@/types/User";
import { DocumentData } from "firebase/firestore";

const getDataFromLS = (): User | null => {
    const localStorageData: any = {};
  
    for (let i = 0; i < localStorage.length; i++) {
      const key: string | null = localStorage.key(i);
      if (key) {
        try {
          localStorageData[key] = JSON.parse(localStorage.getItem(key)!);
        } catch (error) {
          console.error(`Error parsing key "${key}":`, error);
          localStorageData[key] = localStorage.getItem(key);
        }
      }
    }
  
    return !!localStorageData ? null : localStorageData;
  };

const setDataToLS = (data: DocumentData) => {
    try {
      for (const [key, value] of Object.entries(data)) {
        localStorage.setItem(key, JSON.stringify(value));
      }
      console.log("The data has been saved successfully to localStorage");
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  };

export {getDataFromLS, setDataToLS};