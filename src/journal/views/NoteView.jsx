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
  startUpdateNote,
  startUploadingFile,
} from "../../store/journal";
import { useEffect, useRef } from "react";
import Swal from "sweetalert2";

import "sweetalert2/dist/sweetalert2.css";
import { UploadFileOutlined } from "@mui/icons-material";

const dateFromNumber = (date) => {
  const newDate = new Date(date);
  return newDate.toUTCString();
};

export const NoteView = () => {
  const dispatch = useDispatch();

  const { currentNoteActive, msgSaved, isSaving } = useSelector(
    (state) => state.journal
  );
  const { formState, onInputChange } = useForm(currentNoteActive);
  const { title, body, date } = formState;

  useEffect(() => {
    if (!msgSaved.length > 0) return;
    Swal.fire("Nota actualizada", msgSaved, "success");
  }, [msgSaved]);

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
          <UploadFileOutlined />
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
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid2>

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

      {/* Image gallery */}

      <ImageGallery />
    </Grid2>
  );
};
