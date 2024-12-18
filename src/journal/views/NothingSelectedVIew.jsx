import { Grid2, Typography } from "@mui/material";

export const NothingSelectedVIew = () => {
  return (
    <Grid2
      container
      spacing={2}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      minHeight={"calc(100vh - 120px)"}
      sx={{
        minHeight: "calc(100vh - 120px)",
        backgroundColor: "primary.main",
        borderRadius: 6,
      }}
    >

      <Grid2 xs={12}>
        {/* <StarOutline sx={{ fontSize: 100, color: "white" }} /> */}
        <Typography color="white" variant="h5" fontSize={100}>
          🐦‍⬛
        </Typography>
      </Grid2>

      <Grid2 xs={12}>

        <Typography color="white" variant="h5">
          Seleciona o crea una entrada
        </Typography>
        
      </Grid2>


    </Grid2>
  );
};
