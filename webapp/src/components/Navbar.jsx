import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Box, Flex, Button, Text } from '@chakra-ui/react';

const Navbar = () => {
  const { authState, logout } = useContext(AuthContext);

  return (
    <Flex as="nav" p="4" bg="blue.500" color="white" justify="space-between">
      <Box>
        {authState.isAuthenticated && <Text>{authState.email}</Text>}
      </Box>
      <Box>
        {authState.isAuthenticated ? (
          <>
            <Button as={Link} to="/" mr="4">
              Home
            </Button>
            <Button onClick={logout}>Logout</Button>
          </>
        ) : (
          <Button as={Link} to="/login">
            Login
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
