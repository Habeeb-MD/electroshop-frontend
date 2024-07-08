import React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Link } from "react-router-dom";
import ProductList from "../components/products/ProductList";

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  featuredProducts: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.hero}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Welcome to ElectroShop
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Discover the latest in electronics and gadgets. Shop our wide range
            of products and stay ahead with cutting-edge technology.
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/products"
                >
                  Browse All Products
                </Button>
              </Grid>
              {/*<Grid item>*/}
              {/*  <Button*/}
              {/*    variant="outlined"*/}
              {/*    color="primary"*/}
              {/*    component={Link}*/}
              {/*    to="/categories"*/}
              {/*  >*/}
              {/*    Explore Categories*/}
              {/*  </Button>*/}
              {/*</Grid>*/}
            </Grid>
          </div>
        </Container>
      </div>
      <Container className={classes.featuredProducts}>
        <Typography variant="h4" align="center" gutterBottom>
          Featured Products
        </Typography>
        <ProductList featured={true} />
      </Container>
    </React.Fragment>
  );
};

export default Home;
