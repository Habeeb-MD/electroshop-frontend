import React from "react";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import makeStyles from "@mui/styles/makeStyles";

import { useCart } from "../../hooks/useCart.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  image: {
    width: "100%",
    height: "auto",
    maxHeight: 100,
    objectFit: "contain",
  },
  quantityControl: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityInput: {
    width: 40,
    textAlign: "center",
    "& input": {
      textAlign: "center",
    },
  },
  removeButton: {
    marginLeft: "auto",
  },
  price: {
    fontWeight: "bold",
  },
}));

const CartItem = ({ item }) => {
  const classes = useStyles();
  const { removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <img src={item.image} alt={item.name} className={classes.image} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              ${item.price.toFixed(2)} each
            </Typography>
          </Grid>
          <Grid item xs={6} sm={2}>
            <div className={classes.quantityControl}>
              <IconButton
                size="small"
                onClick={() => handleQuantityChange(item.quantity - 1)}
              >
                <RemoveIcon />
              </IconButton>
              <TextField
                className={classes.quantityInput}
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(parseInt(e.target.value) || 0)
                }
                inputProps={{ min: 0, style: { textAlign: "center" } }}
              />
              <IconButton
                size="small"
                onClick={() => handleQuantityChange(item.quantity + 1)}
              >
                <AddIcon />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={4} sm={2}>
            <Typography variant="h6" className={classes.price}>
              ${(item.price * item.quantity).toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={1}>
            <IconButton
              className={classes.removeButton}
              onClick={() => removeFromCart(item.id)}
              color="secondary"
              aria-label="remove item"
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CartItem;
