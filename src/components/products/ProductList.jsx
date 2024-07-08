import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ProductCard from "./ProductCard";
import { getProducts } from "../../services/products.js";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  filterSection: {
    padding: theme.spacing(2),
  },
  filterItem: {
    marginBottom: theme.spacing(2),
  },
  productGrid: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(3),
    },
  },
}));

const ProductList = ({ featured = false }) => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters and sort
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(featured ? data.slice(0, 6) : data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [featured]);

  useEffect(() => {
    let result = products;

    if (searchTerm) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (brandFilter) {
      result = result.filter((product) => product.brand === brandFilter);
    }

    if (typeFilter) {
      result = result.filter((product) => product.product_type === typeFilter);
    }

    if (priceFilter.min !== "") {
      result = result.filter(
        (product) => product.price >= Number(priceFilter.min),
      );
    }

    if (priceFilter.max !== "") {
      result = result.filter(
        (product) => product.price <= Number(priceFilter.max),
      );
    }

    setFilteredProducts(result);
  }, [products, searchTerm, brandFilter, typeFilter, priceFilter]);

  const handleSortChange = (e) => {
    const newOrder = e.target.value;
    setProducts((prevState) => {
      if (newOrder === "asc") {
        prevState.sort((a, b) => a.price - b.price);
      } else if (newOrder === "desc") {
        prevState.sort((a, b) => b.price - a.price);
      }
      return prevState;
    });
    setSortOrder(e.target.value);
  };
  if (loading) return <Typography>Loading products...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  const brands = [...new Set(products.map((product) => product.brand))];
  const types = [...new Set(products.map((product) => product.product_type))];

  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        {!featured && (
          <Grid item xs={12} md={3}>
            <Paper elevation={3} className={classes.filterSection}>
              <Typography variant="h6" gutterBottom>
                Filters
              </Typography>
              <Divider />
              <Box mt={2}>
                <TextField
                  label="Search Products"
                  variant="outlined"
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={classes.filterItem}
                  size="small"
                />
                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.filterItem}
                  size="small"
                >
                  <InputLabel>Brand</InputLabel>
                  <Select
                    value={brandFilter}
                    onChange={(e) => setBrandFilter(e.target.value)}
                    label="Brand"
                  >
                    <MenuItem value="">All Brands</MenuItem>
                    {brands.map((brand) => (
                      <MenuItem key={brand} value={brand}>
                        {brand}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.filterItem}
                  size="small"
                >
                  <InputLabel>Product Type</InputLabel>
                  <Select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    label="Product Type"
                  >
                    <MenuItem value="">All Types</MenuItem>
                    {types.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Min Price"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  variant="outlined"
                  value={priceFilter.min}
                  onChange={(e) =>
                    setPriceFilter({ ...priceFilter, min: e.target.value })
                  }
                  fullWidth
                  className={classes.filterItem}
                  size="small"
                />
                <TextField
                  label="Max Price"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  variant="outlined"
                  value={priceFilter.max}
                  onChange={(e) =>
                    setPriceFilter({ ...priceFilter, max: e.target.value })
                  }
                  fullWidth
                  className={classes.filterItem}
                  size="small"
                />
                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.filterItem}
                  size="small"
                >
                  <InputLabel>Sort by Price</InputLabel>
                  <Select
                    value={sortOrder}
                    onChange={handleSortChange}
                    label="Sort by Price"
                  >
                    <MenuItem value="">No Sorting</MenuItem>
                    <MenuItem value="asc">Price: Low to High</MenuItem>
                    <MenuItem value="desc">Price: High to Low</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Paper>
          </Grid>
        )}
        <Grid
          item
          xs={12}
          md={featured ? 12 : 9}
          className={classes.productGrid}
        >
          <Typography variant="h4" gutterBottom>
            {featured ? "Featured Products" : "All Products"}
          </Typography>
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductList;
