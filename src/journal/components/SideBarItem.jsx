import { TurnedInNot } from "@mui/icons-material";
import {
  Grid2,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal";

const shortStr = (title = "") => {
  return title.length > 10 ? `${title.substring(0, 10)}...` : title;
};

export const SideBarItem = ({ noteItem }) => {
  const { title, body } = noteItem;
  const dispatch = useDispatch();

  const onActivateNote = () => {
    const note = { ...noteItem };
    dispatch(setActiveNote({ note }));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onActivateNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid2 container>
          <ListItemText primary={shortStr(title || "Sin titulo")} />
          <ListItemText secondary={body || "Sin Contenido"} />
        </Grid2>
      </ListItemButton>
    </ListItem>
  );
};

SideBarItem.propTypes = {
  noteItem: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
