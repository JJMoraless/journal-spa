import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FireStore, loadNotes } from "../../common";
import {
  addNewEnptyNote,
  setActiveNote,
  setIsSavingNote,
  setNotes,
  updateNote,
} from "./";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(setIsSavingNote());

    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const notesRef = doc(collection(FireStore, `${uid}/journal/notes`));
    await setDoc(notesRef, newNote); //*crear doc en firestore
    newNote.id = notesRef.id;

    dispatch(addNewEnptyNote({ note: newNote }));
    dispatch(setActiveNote({ note: newNote }));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const notes = await loadNotes(uid);
    dispatch(setNotes({ notes }));
  };
};

export const startUpdateNote = () => {
  return async (dispatch, getState) => {
    dispatch(setIsSavingNote());

    const { uid } = getState().auth;
    const { currentNoteActive } = getState().journal;

    const newNoteToUpdate = { ...currentNoteActive };
    delete newNoteToUpdate.id;

    const pathNote = `${uid}/journal/notes/${currentNoteActive.id}`;
    const noteRef = doc(FireStore, pathNote);

    // * merge: true para que no se borren los campos que no se estan actualizando
    await setDoc(noteRef, newNoteToUpdate, { merge: true });
    dispatch(updateNote({ note: currentNoteActive }));
  };
};
