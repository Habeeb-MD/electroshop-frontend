import { Box, CircularProgress, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: theme.palette.background.default,
  },
  spinner: {
    marginBottom: theme.spacing(2),
  },
  text: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const LoadingSpinner = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CircularProgress
        className={classes.spinner}
        size={60}
        thickness={4}
        color="primary"
      />
      <Typography variant="h6" className={classes.text}>
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
