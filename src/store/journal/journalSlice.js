import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    msgSaved: "",
    notes: [],
    currentNoteActive: null,
    // currentNoteActive: {
    //   id: "123",
    //   title: "",
    //   body: "",
    //   date: 1234567890,
    //   imageUrls: [],
    // },
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
    setSavingNote: (state, { payload }) => {},
    updateNote: (state, { payload }) => {},
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
} = journalSlice.actions;
