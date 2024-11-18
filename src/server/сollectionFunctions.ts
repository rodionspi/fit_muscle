import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import User from "@/types/User";
import { getAuth } from "firebase/auth";

const addData = async (formValues: User) => {
  const {name, email, password} = formValues;
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: name,
      email: email,
      password: password
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export {addData};