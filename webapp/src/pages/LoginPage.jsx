import React,{ useState, useContext,useEffect} from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../contexts/AuthContext";
import { Box, Input, Button, Text, Alert, AlertIcon } from '@chakra-ui/react';


const  loginPage =() => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const {login } = useContext(AuthContext);
    const history = useHistory();

     useEffect(()=>{
        document.getElementById('email').focus();
     },[]);


     const handlesubmit = async(e) =>
        e.preventDefault();
     try{
        const response = await axios.post('API_ENDPOINT/login',{email,password});
        login(response.data.token,email);
        history.push('/');
     } catch(err){
        setError('invalid email or password');
     }

return (
    <Box maxW={"sm"} mx={"auto"} mt={"10"}>
        {
            error && (
                <Alert status="error"  mb={"4"}>
                    <AlertIcon/>
                    {error}
                </Alert>
            )
        }
       
       <form onSubmit={handlesubmit}>
         <input
         
         id="email"
         type="email"
         placeholder="Email"
         value={email}
         onChange={(e) => setPassword(e.target.value)}
         mb="4"
         />
            
          <input 
         type="password"
         placeholder="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         mb="4" />  

         <button type="submit" color="blue" width="full">
            Login
         </button>
       </form>

    </Box>
);
};


export default LoginPage ;