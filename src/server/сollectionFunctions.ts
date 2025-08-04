import { db } from "../../firebaseConfig.js";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import User from "@/types/User";
import { v4 as generateUuid } from "uuid";

const addUser = async (formValues: User) => {
  const {name, email} = formValues;
  try {
    // Check if db is properly initialized
    if (!db) {
      throw new Error("Database not initialized");
    }
    
    const userId = generateUuid();
    
    const docRef = await addDoc(collection(db, "users"), {
      name: name,
      email: email,
      id: userId
    });
    
    console.log("Document written with ID: ", docRef.id);
    return { id: userId, docId: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return null;
  }
};

const getUser = async (formValues: User) => {
  const {email} = formValues;
  try {
    // Check if db is properly initialized
    if (!db) {
      throw new Error("Database not initialized");
    }
    
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return doc.data();
    }
    
    return null;
  } catch (error) {
      console.error("Error while getting collection: ", error);
      return null;
  }
}

export {addUser, getUser};
