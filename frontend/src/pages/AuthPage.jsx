import React, { useState } from 'react';
import {
    Box,
    Container,
    VStack,
    Heading,
    Text,
    Button,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    useToast,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    useColorModeValue,
    Card,
    CardBody,
    Flex,
    Icon,
    HStack,
    Grid,
    GridItem,
} from '@chakra-ui/react';
import { useUserStore } from '../users/user';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaStar, FaShoppingBag, FaArrowRight, FaLeaf, FaHandHoldingHeart, FaArrowLeft } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const AuthPage = () => {
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
    const primaryColor = useColorModeValue("pink.400", "pink.300");
    const secondaryColor = useColorModeValue("purple.400", "purple.300");

    // features list
    const features = [
        {
            icon: FaHandHoldingHeart,
            title: "Handmade with Love",
            description: "Each item is crafted with care and attention to detail"
        },
        {
            icon: FaLeaf,
            title: "Eco-friendly",
            description: "Sustainable materials and practices"
        },
        {
            icon: FaStar,
            title: "Unique Designs",
            description: "One-of-a-kind pieces you won't find anywhere else"
        },
        {
            icon: FaHeart,
            title: "Support Artisans",
            description: "Directly support independent crochet artists"
        }
    ];

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
            // Login
            result = await login({
                email: formData.email,
                password: formData.password
            });
        } else {
            // Signup
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
            navigate("/shop");
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
        //  error clear on typing action
        if(errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return (
        <Box 
            minH="100vh" 
            bg={useColorModeValue("gray.50", "gray.900")}
            py={10}
        >
            <Container maxW="container.xl">
                {/* Back Button */}
                <Button
                    leftIcon={<FaArrowLeft />}
                    variant="ghost"
                    mb={6}
                    onClick={() => navigate('/')}
                >
                    Back to Home
                </Button>

                <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={12} alignItems="center">
                    {/* Left side - Welcome message */}
                    <GridItem>
                        <MotionBox
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <VStack spacing={8} align="start">
                                <Box>
                                    <Heading size="2xl" mb={4}>
                                        Join Our <Text as="span" color={primaryColor}>Yarn Community</Text>
                                    </Heading>
                                    <Text fontSize="lg" color="gray.600">
                                        Create an account to unlock all features
                                    </Text>
                                </Box>

                                <VStack spacing={6} align="start" w="full">
                                    <Text fontSize="lg" color="gray.600" fontWeight="medium">
                                        With an account you can:
                                    </Text>
                                    
                                    <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                                        {features.map((feature, index) => (
                                            <MotionBox
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                            >
                                                <Card 
                                                    h="full" 
                                                    bg={bgColor}
                                                    border="1px solid"
                                                    borderColor={borderColor}
                                                    _hover={{ 
                                                        transform: 'translateY(-3px)',
                                                        boxShadow: 'md',
                                                        borderColor: primaryColor
                                                    }}
                                                    transition="all 0.3s"
                                                >
                                                    <CardBody>
                                                        <VStack spacing={3} align="center" textAlign="center">
                                                            <Box 
                                                                p={2} 
                                                                borderRadius="full" 
                                                                bg={`linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`}
                                                            >
                                                                <Icon as={feature.icon} boxSize={5} color="white" />
                                                            </Box>
                                                            <Heading size="sm">{feature.title}</Heading>
                                                            <Text color="gray.600" fontSize="xs">
                                                                {feature.description}
                                                            </Text>
                                                        </VStack>
                                                    </CardBody>
                                                </Card>
                                            </MotionBox>
                                        ))}
                                    </Grid>
                                </VStack>

                                <Box pt={4}>
                                    <Text color="gray.500" fontSize="sm" mb={3}>
                                        Not ready to join? You can still browse our collection
                                    </Text>
                                    <MotionButton
                                        colorScheme="gray"
                                        rightIcon={<FaArrowRight />}
                                        onClick={() => navigate('/shop')}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Browse as Guest
                                    </MotionButton>
                                </Box>
                            </VStack>
                        </MotionBox>
                    </GridItem>

                    {/* Right side - Login/Signup Form */}
                    <GridItem>
                        <MotionBox
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <Card 
                                w="full" 
                                variant="outline" 
                                borderColor={borderColor}
                                bg={bgColor}
                                boxShadow="2xl"
                            >
                                <CardBody>
                                    <VStack spacing={6}>
                                        <Box textAlign="center" w="full">
                                            <Heading size="lg" mb={2}>
                                                {isLogin ? 'Welcome Back!' : 'Create Account'}
                                            </Heading>
                                            <Text color="gray.600">
                                                {isLogin ? 'Sign in to your account' : 'Join our community today'}
                                            </Text>
                                        </Box>

                                        <Tabs 
                                            isFitted 
                                            w="full" 
                                            index={isLogin ? 0 : 1}
                                            onChange={(index) => setIsLogin(index === 0)}
                                            variant="enclosed-colored"
                                            colorScheme="pink"
                                        >
                                            <TabList mb={6}>
                                                <Tab 
                                                    _selected={{ 
                                                        color: primaryColor, 
                                                        borderColor: primaryColor,
                                                        bg: `${primaryColor}10`
                                                    }}
                                                >
                                                    Login
                                                </Tab>
                                                <Tab 
                                                    _selected={{ 
                                                        color: secondaryColor, 
                                                        borderColor: secondaryColor,
                                                        bg: `${secondaryColor}10`
                                                    }}
                                                >
                                                    Sign Up
                                                </Tab>
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
                                                                    size="lg"
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
                                                                    size="lg"
                                                                />
                                                                <FormErrorMessage>{errors.password}</FormErrorMessage>
                                                            </FormControl>

                                                            <MotionButton
                                                                type="submit"
                                                                colorScheme="pink"
                                                                w="full"
                                                                size="lg"
                                                                isLoading={loading}
                                                                loadingText={isLogin ? "Logging in..." : "Signing up..."}
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                            >
                                                                {isLogin ? "Login to Your Account" : "Create Account"}
                                                            </MotionButton>
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
                                                                    size="lg"
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
                                                                    size="lg"
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
                                                                    size="lg"
                                                                />
                                                                <FormErrorMessage>{errors.password}</FormErrorMessage>
                                                            </FormControl>

                                                            <MotionButton
                                                                type="submit"
                                                                colorScheme="purple"
                                                                w="full"
                                                                size="lg"
                                                                isLoading={loading}
                                                                loadingText="Creating account..."
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                            >
                                                                Join Our Community
                                                            </MotionButton>
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
                        </MotionBox>
                    </GridItem>
                </Grid>
            </Container>
        </Box>
    );
};

export default AuthPage;