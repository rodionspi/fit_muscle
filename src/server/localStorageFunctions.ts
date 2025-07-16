import User from "@/types/User";

const getDataFromLS = (): User | null => {
  const localStorageData: { [key: string]: User  } = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key: string | null = localStorage.key(i);
    if (key) {
      try {
        localStorageData[key] = JSON.parse(localStorage.getItem(key)!);
      } catch (error) {
        console.error(`Error parsing key "${key}":`, error);
        continue;
      }
    }
  }

  return Object.keys(localStorageData).length > 0 ? localStorageData as User : null;
};


const setDataToLS = (data: any) => {
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