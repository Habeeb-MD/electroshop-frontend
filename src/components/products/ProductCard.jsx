import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart.jsx";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  media: {
    height: 200,
    objectFit: "contain",
  },
  content: {
    flexGrow: 1,
  },
  actions: {
    justifyContent: "space-between",
  },
}));

const ProductCard = ({ product }) => {
  const classes = useStyles();
  const { addToCart } = useCart();

  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/product/${product.id}`}>
        <CardMedia
          className={classes.media}
          image={product.image}
          title={product.name}
          component="img"
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h6" component="h2" noWrap>
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            ${product.price.toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <Button size="small" color="primary" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
        <Button
          size="small"
          color="primary"
          component={Link}
          to={`/product/${product.id}`}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
