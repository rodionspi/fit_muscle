import { db } from "../../firebaseConfig.js"
import { collection, getDocs } from 'firebase/firestore';

// Check if cached data exists and is fresh (e.g., <24 hours old)
const getCachedMuscles = () => {
  const cached = localStorage.getItem("muscles");
  if (cached) {
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < 86400000) { // 24h cache
      return data;
    }
  }
  return null;
};

// Fetch from Firestore if no valid cache exists
export const getMuscles = async () => {
  const cached = getCachedMuscles();
  if (cached) return cached;

  const musclesCol = collection(db, "muscles");
  const snapshot = await getDocs(musclesCol);
  const data = snapshot.docs.map(doc => doc.data());

  // Cache with timestamp
  localStorage.setItem("muscles", JSON.stringify({
    data,
    timestamp: Date.now()
  }));

  return data;
};
