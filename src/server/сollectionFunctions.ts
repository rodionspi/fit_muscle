import { db } from "../../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import User from "@/types/User";
import { v4 as generateUuid } from "uuid";

const addUser = async (formValues: User) => {
  const {name, email, password} = formValues;
  try {
    const userId = generateUuid();
    
    const docRef = await addDoc(collection(db, "users"), {
      name: name,
      email: email,
      password: password,
      id: userId
    });
    
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    return null;
  }
};

const getUser = async (formValues: User) => {
  const {email, password} = formValues;
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      if (data.email === email) {
        return data; 
      }
    }
    return null
  } catch (error) {
      console.error("Error while getting collection: ", error);
      return null
  }
}

export {addUser, getUser};
