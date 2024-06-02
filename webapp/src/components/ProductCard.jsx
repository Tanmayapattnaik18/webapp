import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
      <Heading size="md" mb="2">{product.title}</Heading>
      <Text>{product.category}</Text>
      <Text>${product.price}</Text>
      <Button as={Link} to={`/product/${product.id}`} mt="4">
        More Details
      </Button>
    </Box>
  );
};

export default ProductCard;
