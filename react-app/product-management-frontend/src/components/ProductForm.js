import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Use 'useNavigate' here
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
} from '@mui/material';

const AddEditProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // This will contain the product ID if it's an edit operation
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  useEffect(() => {
    if (id) {
      setLoading(true);
      const token = localStorage.getItem('token'); 
      // Fetch the product data if an id exists in the URL
      axios
        .get(`http://localhost:5002/api/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        .then((response) => {
          setProduct(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching product data:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const method = id ? 'put' : 'post'; // Use PUT for editing, POST for creating
    const url = id
      ? `http://localhost:5002/api/products/${id}`
      : 'http://localhost:5002/api/products';
      const token = localStorage.getItem('token');
    axios[method](url, product, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        navigate('/'); // Use navigate to redirect to product list after submission
      })
      .catch((error) => {
        console.error('Error saving product:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Product' : 'Add Product'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Product Name"
              name="name"
              value={product.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price"
              name="price"
              value={product.price}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={product.description}
              onChange={handleChange}
              fullWidth
              multiline
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Category"
              name="category"
              value={product.category}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          {id ? 'Save Changes' : 'Add Product'}
        </Button>
      </form>
    </Container>
  );
};

export default AddEditProduct;
