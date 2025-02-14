import { createSlice } from "@reduxjs/toolkit";

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
    currentNoteActive: null
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

      if (!noteIntex) {
        throw new Error("Note not found");
      }

      state.notes[noteIntex] = noteToUpdate;
      state.msgSaved = `Nota: ${noteToUpdate.title}, actualizada correctamente`;
    },

    setImgsToActiveNote: (state, { payload }) => {
      state.currentNoteActive.imageUrls = [
        ...state.currentNoteActive.imageUrls,
        ...payload.imgUrls,
      ];

      state.isSaving = false;
    },

    setSavingNote: (state, { payload }) => {},
    deleteNoteById: (state, { payload }) => {},
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
  setImgsToActiveNote
} = journalSlice.actions;
