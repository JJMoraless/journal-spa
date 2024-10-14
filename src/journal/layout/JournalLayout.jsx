import { Box } from "@mui/material";

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* navbar */}

      {/* sidebar */}

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: "background.default" }}
      >
        {/* toolbar */}
        {children}
      </Box>
    </Box>
  );
};
