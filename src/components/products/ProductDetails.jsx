import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useCart } from "../../hooks/useCart.jsx";
import { getProductById } from "../../services/products.js";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  image: {
    width: "100%",
    height: 400,
    objectFit: "contain",
    marginBottom: theme.spacing(2),
  },
  infoItem: {
    marginBottom: theme.spacing(2),
  },
  label: {
    fontWeight: "bold",
    marginRight: theme.spacing(1),
  },
}));

const ProductDetail = () => {
  const classes = useStyles();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch product details. Please try again later.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <Typography>Loading product details...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!product) return <Typography>Product not found.</Typography>;

  return (
    <Container className={classes.root}>
      <Paper elevation={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box p={3}>
              <img
                src={product.image}
                alt={product.name}
                className={classes.image}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box p={3}>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              <Divider />
              <Box my={2}>
                <Typography variant="h5" color="primary" gutterBottom>
                  ${product.price.toFixed(2)}
                </Typography>
              </Box>
              <Box className={classes.infoItem}>
                <Typography variant="body1">
                  <span className={classes.label}>Brand:</span>
                  {product.brand}
                </Typography>
              </Box>
              <Box className={classes.infoItem}>
                <Typography variant="body1">
                  <span className={classes.label}>Type:</span>
                  {product.product_type}
                </Typography>
              </Box>
              <Box className={classes.infoItem}>
                <Typography variant="body1">
                  <span className={classes.label}>Description:</span>
                </Typography>
                <Typography variant="body2" paragraph>
                  {product.description}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => addToCart(product)}
                fullWidth
              >
                Add to Cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetail;
