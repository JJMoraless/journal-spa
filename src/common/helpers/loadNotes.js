import { collection, getDocs } from "firebase/firestore/lite";
import { FireStore } from "../firebase";

export const loadNotes = async (uid) => {
  if (!uid) throw new Error("uid is required");

  const collectionRef = collection(FireStore, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);

  const notesFound = [] 
  docs.forEach((docItem) => notesFound.push({id: docItem.id ,...docItem.data()}) ) 


  return notesFound;
};
