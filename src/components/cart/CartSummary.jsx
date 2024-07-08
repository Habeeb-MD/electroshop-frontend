import { Divider, Paper, Typography } from "@mui/material";
import { useCart } from "../../hooks/useCart.jsx";

const CartSummary = () => {
  const { getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const shipping = 9.99; // You can adjust this or make it dynamic
  const total = subtotal + shipping;

  return (
    <Paper style={{ padding: "20px" }}>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <Divider style={{ margin: "10px 0" }} />
      <Typography>Subtotal: ${subtotal.toFixed(2)}</Typography>
      <Typography>Shipping: ${shipping.toFixed(2)}</Typography>
      <Divider style={{ margin: "10px 0" }} />
      <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
    </Paper>
  );
};

export default CartSummary;
