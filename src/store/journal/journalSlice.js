import { createSlice } from "@reduxjs/toolkit";
import { alertMsg } from "../../common/helpers";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    msgSaved: "",
    notes: [],
    // currentNoteActive: {
    //   id: "",
    //   title: "",
    //   body: "",
    //   date: 1234567890,
    //   imageUrls: [],
    // },
    currentNoteActive: null,
  },
  reducers: {
    setIsSavingNote: (state) => {
      state.isSaving = true;
    },

    addNewEnptyNote: (state, { payload }) => {
      state.notes.push(payload.note);
      state.isSaving = false;
    },

    setActiveNote: (state, { payload }) => {
      state.currentNoteActive = payload.note;
    },

    setNotes: (state, { payload }) => {
      state.notes = payload.notes;
    },

    updateNote: (state, { payload }) => {
      state.isSaving = false;
      const noteToUpdate = payload.note;

      const noteIntex = state.notes.findIndex(
        (note) => note.id === noteToUpdate.id
      );

      if (noteIntex === -1) {
        throw new Error("Note not found");
      }

      state.notes[noteIntex] = noteToUpdate;
      const msg = `Nota: ${noteToUpdate.title}, actualizada correctamente`;
      alertMsg({ msg });
    },

    setImgsToActiveNote: (state, { payload }) => {
      state.currentNoteActive.imageUrls = [
        ...(state.currentNoteActive.imageUrls || []),
        ...payload.imgUrls,
      ];

      state.isSaving = false;
    },

    clearNotesOnLogout: (state) => {
      state.isSaving = false;
      state.msgSaved = "";
      state.notes = [];
      state.currentNoteActive = null;
    },

    deleteNoteById: (state, { payload: { id } }) => {
      state.isSaving = false;
      state.notes = state.notes.filter((note) => note.id !== id);

      alertMsg( { msg: `Nota eliminada correctamente` } );

      if (state.currentNoteActive?.id === id) {
        state.currentNoteActive = null;
      }
    },
  },
});

export const {
  addNewEnptyNote,
  deleteNoteById,
  setActiveNote,
  setNotes,
  setSavingNote,
  updateNote,
  setIsSavingNote,
  setImgsToActiveNote,
  clearNotesOnLogout,
} = journalSlice.actions;
