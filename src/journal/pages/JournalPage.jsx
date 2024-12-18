import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal";

import { IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { NothingSelectedVIew } from "../views/NothingSelectedVIew";

import { NoteView } from "../views";
import { JournalLayout } from "../layout/JournalLayout";

export const JournalPage = () => {
  const dispatch = useDispatch();
  const { isSaving, currentNoteActive } = useSelector((state) => state.journal);

  const onNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      {
        currentNoteActive 
          ? <NoteView /> 
          : <NothingSelectedVIew />
      }
      <IconButton
        disabled={isSaving}
        onClick={onNewNote}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          bottom: 50,
          right: 50,
        }}
      >
        <AddOutlined />
      </IconButton>
    </JournalLayout>
  );
};
