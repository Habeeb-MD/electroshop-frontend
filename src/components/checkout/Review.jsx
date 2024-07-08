import * as React from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useCart } from "../../hooks/useCart";

export default function Review({ handlePlaceOrder }) {
  const { cart, getCartTotal, shippingAddress, paymentMethod } = useCart();
  const totalPrice = getCartTotal();
  const shippingCost = 9.99; // TO DO :- Calculate this dynamically

  return (
    <Stack spacing={2}>
      <List disablePadding>
        {cart.map((item) => (
          <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={item.name}
              secondary={`Quantity: ${item.quantity}`}
            />
            <Typography variant="body2">
              ${(item.price * item.quantity).toFixed(2)}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Shipping" secondary="Plus taxes" />
          <Typography variant="body2">${shippingCost.toFixed(2)}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${(totalPrice + shippingCost).toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Shipment details
          </Typography>
          <Typography gutterBottom>
            {shippingAddress.firstName + " " + shippingAddress.lastName}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {`${shippingAddress.address1} ${shippingAddress.address2}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zip}, ${shippingAddress.country}`}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Payment details
          </Typography>
          <Grid container>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ width: "100%", mb: 1 }}
            >
              <Typography variant="body1" color="text.secondary">
                Card Name:
              </Typography>
              <Typography variant="body2">{paymentMethod.cardName}</Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ width: "100%", mb: 1 }}
            >
              <Typography variant="body1" color="text.secondary">
                Card number:
              </Typography>
              <Typography variant="body2">
                xxxx-xxxx-xxxx-
                {paymentMethod.cardNumber.substring(
                  paymentMethod.cardNumber.length - 4,
                )}
              </Typography>
            </Stack>
          </Grid>
        </div>
      </Stack>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handlePlaceOrder()}
        fullWidth
      >
        Place Order
      </Button>
    </Stack>
  );
}
