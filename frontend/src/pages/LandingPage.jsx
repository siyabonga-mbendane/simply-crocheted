import React, { useState } from 'react';
import {Box,Container,VStack,Heading,Text,Button,Input,FormControl,FormLabel,FormErrorMessage,useToast,Tabs,TabList,TabPanels,Tab,TabPanel,useColorModeValue,Card,CardBody,} from '@chakra-ui/react';
import { useUserStore } from '../users/user';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const { signup, login, loading } = useUserStore();
    const toast = useToast();
    const navigate = useNavigate();
    
    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.600");

    const validateForm = () => {
        const newErrors = {};
        
        if(!formData.email) {
            newErrors.email = "Email is required";
        } else if(!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        
        if(!formData.password) {
            newErrors.password = "Password is required";
        } else if(formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        
        if(!isLogin && !formData.username) {
            newErrors.username = "Username is required";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!validateForm()) {
            return;
        }
        
        let result;
        
        if(isLogin) {
            // login
            result = await login({
                email: formData.email,
                password: formData.password
            });
        } else {
            // signup
            result = await signup({
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
        }
        
        if(result.success) {
            toast({
                title: "Success",
                description: result.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate("/");
        } else {
            toast({
                title: "Error",
                description: result.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // error clear on typing action
        if(errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return (
        <Container maxW="container.md" py={10}>
            <VStack spacing={8}>
                {/* Hero Section */}
                <Box textAlign="center">
                    <Heading 
                        size="2xl" 
                        mb={4}
                        bgGradient="linear(to-r, cyan.400, blue.500)"
                        bgClip="text"
                    >
                        Simply Crochet 🧶
                    </Heading>
                    <Text fontSize="xl" color="gray.600">
                        Discover beautiful handmade crochet items
                    </Text>
                </Box>

                {/* Welcome Card */}
                <Card 
                    w="full" 
                    variant="outline" 
                    borderColor={borderColor}
                    bg={bgColor}
                >
                    <CardBody>
                        <VStack spacing={6}>
                            <Tabs 
                                isFitted 
                                w="full" 
                                index={isLogin ? 0 : 1}
                                onChange={(index) => setIsLogin(index === 0)}
                            >
                                <TabList mb={4}>
                                    <Tab>Login</Tab>
                                    <Tab>Sign Up</Tab>
                                </TabList>

                                <TabPanels>
                                    <TabPanel>
                                        <form onSubmit={handleSubmit}>
                                            <VStack spacing={4}>
                                                <FormControl isInvalid={!!errors.email}>
                                                    <FormLabel>Email</FormLabel>
                                                    <Input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="Enter your email"
                                                    />
                                                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                                                </FormControl>

                                                <FormControl isInvalid={!!errors.password}>
                                                    <FormLabel>Password</FormLabel>
                                                    <Input
                                                        type="password"
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        placeholder="Enter your password"
                                                    />
                                                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                                                </FormControl>

                                                <Button
                                                    type="submit"
                                                    colorScheme="blue"
                                                    w="full"
                                                    isLoading={loading}
                                                    loadingText={isLogin ? "Logging in..." : "Signing up..."}
                                                >
                                                    Login
                                                </Button>
                                            </VStack>
                                        </form>
                                    </TabPanel>

                                    <TabPanel>
                                        <form onSubmit={handleSubmit}>
                                            <VStack spacing={4}>
                                                <FormControl isInvalid={!!errors.username}>
                                                    <FormLabel>Username</FormLabel>
                                                    <Input
                                                        type="text"
                                                        name="username"
                                                        value={formData.username}
                                                        onChange={handleChange}
                                                        placeholder="Choose a username"
                                                    />
                                                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                                                </FormControl>

                                                <FormControl isInvalid={!!errors.email}>
                                                    <FormLabel>Email</FormLabel>
                                                    <Input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="Enter your email"
                                                    />
                                                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                                                </FormControl>

                                                <FormControl isInvalid={!!errors.password}>
                                                    <FormLabel>Password</FormLabel>
                                                    <Input
                                                        type="password"
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        placeholder="Create a password (min. 6 characters)"
                                                    />
                                                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                                                </FormControl>

                                                <Button
                                                    type="submit"
                                                    colorScheme="green"
                                                    w="full"
                                                    isLoading={loading}
                                                    loadingText="Creating account..."
                                                >
                                                    Sign Up
                                                </Button>
                                            </VStack>
                                        </form>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>

                            <Text fontSize="sm" color="gray.500" textAlign="center">
                                By continuing, you agree to our Terms of Service and Privacy Policy
                            </Text>
                        </VStack>
                    </CardBody>
                </Card>

                {/* Guest Access Option */}
                <Box textAlign="center">
                    <Text mb={4}>Just want to browse?</Text>
                    <Button
                        as={Link}
                        to="/"
                        variant="outline"
                        colorScheme="gray"
                        onClick={() => {
                            // Set as guest user
                            useUserStore.setState({
                                user: { role: 'guest' },
                                isAuthenticated: false
                            });
                        }}
                    >
                        Continue as Guest
                    </Button>
                </Box>
            </VStack>
        </Container>
    );
};

export default LandingPage;