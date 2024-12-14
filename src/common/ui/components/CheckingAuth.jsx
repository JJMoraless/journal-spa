import { CircularProgress, Grid2 } from "@mui/material";

export const CheckingAuth = () => {
  return (
    <Grid2
      container
      spacing={2}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
      <Grid2
        size={{ xs: 12, md: 5.5 }}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <CircularProgress color="warning" />
      </Grid2>
    </Grid2>
  );
};
