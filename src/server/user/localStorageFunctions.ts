import User from "@/types/User";

const USER_STORAGE_KEYS = ["id", "name", "email", "calendar"] as const;

const isUserData = (value: unknown): value is User => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return USER_STORAGE_KEYS.some((key) => key in candidate);
};

const getDataFromLS = (): User | null => {
  const localStorageData: Record<string, unknown> = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key: string | null = localStorage.key(i);
    if (key && USER_STORAGE_KEYS.includes(key as (typeof USER_STORAGE_KEYS)[number])) {
      try {
        const parsedValue = JSON.parse(localStorage.getItem(key)!);
        if (parsedValue !== null && parsedValue !== undefined) {
          localStorageData[key] = parsedValue;
        }
      } catch (error) {
        console.error(`Error parsing key "${key}":`, error);
        continue;
      }
    }
  }

  return isUserData(localStorageData) ? (localStorageData as User) : null;
};


const setDataToLS = (data: User) => {
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