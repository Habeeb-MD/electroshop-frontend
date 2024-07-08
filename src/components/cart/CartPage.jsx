import React from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useCart } from "../../hooks/useCart.jsx";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(3),
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  cartContent: {
    marginTop: theme.spacing(2),
  },
  emptyCart: {
    textAlign: "center",
    padding: theme.spacing(3),
  },
  clearButton: {
    marginTop: theme.spacing(2),
  },
  checkoutButton: {
    marginTop: theme.spacing(2),
  },
  summaryPaper: {
    padding: theme.spacing(2),
    height: "100%",
  },
}));

const CartPage = () => {
  const classes = useStyles();
  const { cart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <Container className={classes.root}>
        <Typography variant="h4" className={classes.title}>
          <ShoppingCartIcon className={classes.icon} />
          Your Cart
        </Typography>
        <Paper className={classes.emptyCart}>
          <Typography variant="h6" gutterBottom>
            Your cart is empty.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Looks like you haven't added anything to your cart yet.
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Start Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        <ShoppingCartIcon className={classes.icon} />
        Your Cart
      </Typography>
      <Grid container spacing={3} className={classes.cartContent}>
        <Grid item xs={12} md={8}>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <Divider />
          <Button
            onClick={clearCart}
            variant="outlined"
            color="secondary"
            startIcon={<DeleteIcon />}
            className={classes.clearButton}
          >
            Clear Cart
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.summaryPaper}>
            <CartSummary />
            <Button
              component={Link}
              to="/checkout"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.checkoutButton}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
