import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import { getOrderDetails } from "../../services/orders";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderData = await getOrderDetails(id);
        setOrder(orderData);
        console.log({ orderData });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch order details. Please try again.");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) return <Typography>Loading order details...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!order) return <Typography>Order not found.</Typography>;

  return (
    <Paper style={{ padding: "20px", maxWidth: "800px", margin: "20px auto" }}>
      <Typography variant="h4" gutterBottom>
        Order #{order.id}
      </Typography>
      <Typography variant="subtitle1">
        Date: {new Date(order.createdAt).toLocaleString()}
      </Typography>
      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Items
      </Typography>
      <List>
        {order.OrderItems.map((item) => (
          <ListItem key={item.product_id}>
            <ListItemText
              primary={item.product_name}
              secondary={`Quantity: ${item.quantity} - Price: $${item.price * item.quantity}`}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Total: ${order.total_amount}
      </Typography>

      <Grid container spacing={3} style={{ marginTop: "10px" }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Shipping Address
          </Typography>
          <Typography>
            {order.shipping_address.address1 +
              "," +
              order.shipping_address.address2}
          </Typography>
          <Typography>{order.shipping_address.street}</Typography>
          <Typography>
            {order.shipping_address.city}, {order.shipping_address.state}{" "}
            {order.shipping_address.zip}
          </Typography>
          <Typography>{order.shipping_address.country}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Payment Method
          </Typography>
          <Typography>{order.payment_details.cardName}</Typography>
          <Typography>
            xxxx-xxxx-xxxx-{" "}
            {order.payment_details.cardNumber.substring(
              order.payment_details.cardNumber.length - 4,
            )}
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Order Status
      </Typography>
      <Typography>{order.status}</Typography>
    </Paper>
  );
};

export default OrderDetails;
