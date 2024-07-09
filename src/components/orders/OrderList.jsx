import { useEffect, useState } from "react";
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getOrders } from "../../services/orders";
import makeStyles from "@mui/styles/makeStyles";
import LoadingSpinner from "../common/LoadingSpinner.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
  },
  filterPaper: {
    padding: theme.spacing(2),
    height: "100%",
  },
  formControl: {
    marginBottom: theme.spacing(2),
    minWidth: "100%",
  },
  listItem: {
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
}));

const OrderList = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter and sort states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [status, setStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc' for earliest first, 'desc' for latest first

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrders();
        setOrders(fetchedOrders);
        setFilteredOrders(fetchedOrders);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch orders. Please try again.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = [...orders];

    if (startDate) {
      filtered = filtered.filter(
        (order) => new Date(order.createdAt) >= new Date(startDate),
      );
    }
    if (endDate) {
      filtered = filtered.filter(
        (order) => new Date(order.createdAt) <= new Date(endDate),
      );
    }
    if (minPrice) {
      filtered = filtered.filter(
        (order) => order.total_amount >= parseFloat(minPrice),
      );
    }
    if (maxPrice) {
      filtered = filtered.filter(
        (order) => order.total_amount <= parseFloat(maxPrice),
      );
    }
    if (status !== "all") {
      filtered = filtered.filter((order) => order.status === status);
    }

    // Sort the filtered orders
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredOrders(filtered);
  }, [orders, startDate, endDate, minPrice, maxPrice, status, sortOrder]);

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper className={classes.filterPaper}>
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>
            <FormControl className={classes.formControl}>
              <TextField
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                label="Min Price"
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                label="Max Price"
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Sort Order</InputLabel>
              <Select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <MenuItem value="asc">Earliest First</MenuItem>
                <MenuItem value="desc">Latest First</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom>
              Your Orders
            </Typography>
            <List>
              {filteredOrders.map((order) => (
                <ListItem key={order.id} className={classes.listItem}>
                  <ListItemText
                    primary={
                      <Typography variant="h6">{`Order #${order.id}`}</Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2">
                          Date: {new Date(order.createdAt).toLocaleString()}
                        </Typography>
                        <Typography variant="body2">
                          Total: ${order.total_amount.toFixed(2)}
                        </Typography>
                        <Typography variant="body2">
                          Status: {order.status}
                        </Typography>
                      </>
                    }
                  />
                  <Button
                    component={Link}
                    to={`/orders/${order.id}`}
                    variant="contained"
                    color="primary"
                  >
                    View Details
                  </Button>
                </ListItem>
              ))}
            </List>
            {filteredOrders.length === 0 && (
              <Typography>
                No orders found for the selected criteria.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderList;
