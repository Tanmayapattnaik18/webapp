// src/pages/ProductDetailsPage.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { Box, Heading, Text, Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useToast } from '@chakra-ui/react';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { authState } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const onClose = () => setIsDialogOpen(false);
  const toast = useToast();

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`API_ENDPOINT/products/${id}`, {
        headers: {
          Authorization: `Bearer ${authState.token}`
        }
      });
      setProduct(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching product details');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    setIsDialogOpen(false);
    toast({
      title: "Item added to cart",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
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
          <Heading>{product.title}</Heading>
          <Text>{product.description}</Text>
          <Text>${product.price}</Text>
          <Button onClick={() => setIsDialogOpen(true)}>Add to Cart</Button>

          <AlertDialog isOpen={isDialogOpen} onClose={onClose}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Add to Cart
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure you want to add this item to cart?
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="blue" onClick={handleAddToCart} ml={3}>
                    Confirm
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </>
      )}
    </Box>
  );
};

export default ProductDetailsPage;
