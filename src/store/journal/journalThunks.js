import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FireStore, loadNotes } from "../../common";
import { addNewEnptyNote, setActiveNote, setIsSavingNote, setNotes } from "./";

export const startNewNote = () => {
    
  return async (dispatch, getState) => {
    dispatch(setIsSavingNote());

    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const newDocRef = doc(collection(FireStore, `${uid}/journal/notes`));
    const docCreatedRes = await setDoc(newDocRef, newNote);
    newNote.id = newDocRef.id;

    dispatch(addNewEnptyNote({ note: newNote }));
    dispatch(setActiveNote({ note: newNote }));

    console.log({ newDocRef, docCreatedRes });
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const notes = await loadNotes(uid);
    dispatch(setNotes({ notes }));
  };
};
