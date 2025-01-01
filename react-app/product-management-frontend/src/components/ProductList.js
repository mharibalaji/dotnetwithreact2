import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('name');  // Default sorting by name
  const [filter, setFilter] = useState('');   // Default filter is no category
  const [categories, setCategories] = useState([]); // For category filter options
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // To control the open state of the dialog
  const [productToDelete, setProductToDelete] = useState(null); // To store the product id to delete

  // Fetching products from the API
  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token'); 
    axios
      .get('http://localhost:5002/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
    
    // Fetch categories for the filter
    axios
      .get('http://localhost:5002/api/products/categories', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Sorting logic
  const sortProducts = (products, sortBy) => {
    return [...products].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        return a.price - b.price;
      }
      return 0;
    });
  };

  // Filtering logic
  const filterProducts = (products, category) => {
    if (category) {
      return products.filter((product) => product.category === category);
    }
    return products;
  };

  // Apply sorting and filtering
  const filteredSortedProducts = filterProducts(sortProducts(products, sort), filter);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  // Delete Product
  const handleDelete = (id) => {
    const token = localStorage.getItem('token'); 
    axios
      .delete(`http://localhost:5002/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        // Refresh the product list after deletion
        setProducts(products.filter((product) => product.id !== id));
        setOpenDeleteDialog(false); // Close dialog after deletion
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  // Open the delete confirmation dialog
  const openDeleteDialogBox = (productId) => {
    setProductToDelete(productId);
    setOpenDeleteDialog(true);
  };

  // Close the delete confirmation dialog
  const closeDeleteDialogBox = () => {
    setOpenDeleteDialog(false);
    setProductToDelete(null);
  };

  return (
      <Container>
        <Navbar />
      <Typography variant="h4" gutterBottom>
        {/* Product List */}
      </Typography>

      {/* Sorting and Filtering Controls */}
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={6} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="price">Price</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Filter By Category</InputLabel>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              label="Filter By Category"
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* <Grid item xs={6} sm={3}>
          <Button
            component={Link}
            to="/add"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Add Product
          </Button>
        </Grid> */}
      </Grid>

      {/* Displaying the List of Products */}
      <Grid container spacing={2} sx={{ mt: 3 }}>
        {filteredSortedProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Box sx={{ border: '1px solid #ddd', borderRadius: '8px', padding: 2 }}>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2">Price: ${product.price}</Typography>
              <Typography variant="body2">Category: {product.category}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {product.description}
              </Typography>
              <Button
                component={Link}
                to={`/edit/${product.id}`}
                variant="contained"
                color="secondary"
                sx={{ mt: 2, mr: 1 }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                sx={{ mt: 2 }}
                onClick={() => openDeleteDialogBox(product.id)}
              >
                Delete
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={closeDeleteDialogBox}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialogBox} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete(productToDelete);
            }}
            color="secondary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductList;
