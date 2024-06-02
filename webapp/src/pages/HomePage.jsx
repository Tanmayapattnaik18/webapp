import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { Box, SimpleGrid, Select, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import { useSearchParams } from 'react-router-dom';

const HomePage = () => {
  const { authState } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get('API_ENDPOINT/products', {
        headers: {
          Authorization: `Bearer ${authState.token}`
        }
      });
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching products');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSortChange = (e) => {
    const sortType = e.target.value;
    setSearchParams({ sort: sortType });
    const sortedProducts = [...products].sort((a, b) => {
      if (sortType === 'asc') return a.price - b.price;
      if (sortType === 'desc') return b.price - a.price;
      return 0;
    });
    setProducts(sortedProducts);
  };

  const handleFilterChange = (e) => {
    const category = e.target.value;
    setSearchParams({ category });
    fetchProducts();
    const filteredProducts = products.filter((product) => product.category === category);
    setProducts(filteredProducts);
  };

  return (
    <Box p="4">
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      ) : (
        <>
          <Select placeholder="Sort by Price" onChange={handleSortChange} mb="4">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
          <Select placeholder="Filter by Category" onChange={handleFilterChange} mb="4">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Home Decor">Home Decor</option>
          </Select>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SimpleGrid>
        </>
      )}
    </Box>
  );
};

export default HomePage;
