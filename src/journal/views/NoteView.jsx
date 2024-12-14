import SaveOutlined from "@mui/icons-material/SaveOutlined";
import { Button, Grid2, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components/ImageGallery";
import { useForm } from "../../common";
import { useSelector } from "react-redux";

const dateFromNumber = (date) => {
  const newDate = new Date(date);
  return newDate.toUTCString();
};

export const NoteView = () => {
  const { currentNoteActive } = useSelector((state) => state.journal);
  const { formState, onInputChange } = useForm(currentNoteActive);
  const { title, body, date } = formState;



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
        <Button sx={{ padding: 2 }}>
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
