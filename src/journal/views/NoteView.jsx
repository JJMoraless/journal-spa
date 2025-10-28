import SaveOutlined from "@mui/icons-material/SaveOutlined";
import {
  Button,
  Grid2,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { ImageGallery } from "../components/ImageGallery";
import { useForm } from "../../common";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveNote,
  startDeletingActiveNote,
  startUpdateNote,
  startUploadingFile,
} from "../../store/journal";
import { useRef } from "react";
import "sweetalert2/dist/sweetalert2.css";
import { DeleteOutline, FileUpload } from "@mui/icons-material";

const dateFromNumber = (date) => {
  const newDate = new Date(date);
  return newDate.toUTCString();
};

export const NoteView = () => {
  const dispatch = useDispatch();

  const { currentNoteActive, isSaving } = useSelector((state) => state.journal);
  const { formState, onInputChange } = useForm(currentNoteActive);
  const { title, body, date } = formState;

  const $fileInputRef = useRef();

  const onUpdateNote = () => {
    dispatch(setActiveNote({ note: formState })); //* actualiza currentNoteActive en store
    dispatch(startUpdateNote()); //* actualiza la nota en la base de datos
  };

  /**
   * @param { Event } event
   */
  const onFileChange = ({ target }) => {
    /** @type {FileList} */
    const files = target.files;
    if (files.length === 0) return;

    dispatch(startUploadingFile({ files }));
  };

  const onDeleteNote = () => {
    dispatch(startDeletingActiveNote()); 
  }

  return (
    <Grid2
      container
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ mb: 1 }}
    >
      <Grid2>
        <Typography sx={{ fontSize: 39, fontWeight: "light" }}>
          {dateFromNumber(date)}
        </Typography>
      </Grid2>

      <Grid2>
        <IconButton
          disabled={isSaving}
          onClick={() => $fileInputRef.current.click()}
        >
          <FileUpload color="primary" />
        </IconButton>

        <input
          type="file"
          multiple
          onChange={onFileChange}
          ref={$fileInputRef}
          style={{
            display: "none",
          }}
        />

        <Button sx={{ padding: 2 }} onClick={onUpdateNote} disabled={isSaving}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} color="primary" />
          Guardar
        </Button>
      </Grid2>

      {/* NOTE TITLE */}
      <Grid2 container size={12}>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Un titulo increible"
          label="Titulo"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
      </Grid2>

      {/* NOTE CONTENT */}
      <Grid2 container size={12}>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          minRows={5}
          placeholder="Que sucedio hoy 🐦‍⬛ ?"
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid2>

      <Grid2 container justifyContent={"end"}>
        <Button onClick={onDeleteNote} sx={{ mt: 2 }} color="error">
          <DeleteOutline />
          Borrar Nota
        </Button>
        <Grid2 />

        {/* NOTE IMAGES */}
        {currentNoteActive?.imageUrls && (
          <ImageGallery images={currentNoteActive.imageUrls} />
        )}
      </Grid2>
    </Grid2>
  );
};
