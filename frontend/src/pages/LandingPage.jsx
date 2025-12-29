import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    VStack,
    Heading,
    Text,
    Button,
    useColorModeValue,
    Card,
    CardBody,
    Flex,
    Icon,
    Image,
    HStack,
    Grid,
    AspectRatio,
    Badge,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaStar, FaShoppingBag, FaArrowRight, FaLeaf, FaHandHoldingHeart } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const LandingPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
    
    const primaryColor = useColorModeValue("pink.400", "pink.300");
    const secondaryColor = useColorModeValue("purple.400", "purple.300");

    // sample crochet items for slideshow
    const crochetItems = [
        {
            id: 1,
            name: "Amigurumi Animals",
            image: "https://images.unsplash.com/photo-1576584337323-ef4b5f5c3a1e?w=800&auto=format&fit=crop&q=60",
            description: "Handmade crochet animals",
            category: "Toys"
        },
        {
            id: 2,
            name: "Cozy Blankets",
            image: "https://images.unsplash.com/photo-1590663558016-dbd2a4d4e93c?w=800&auto=format&fit=crop&q=60",
            description: "Warm and comfortable",
            category: "Home"
        },
        {
            id: 3,
            name: "Fashionable Scarves",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=60",
            description: "Stylish winter wear",
            category: "Fashion"
        },
        {
            id: 4,
            name: "Eco-friendly Bags",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop&q=60",
            description: "Sustainable shopping",
            category: "Accessories"
        }
    ];

    // slideshow auto
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % crochetItems.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

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

    return (
        <Box 
            minH="100vh" 
            bg={useColorModeValue("gray.50", "gray.900")}
            overflow="hidden"
        >
            {/*background elements animation*/}
            <Box position="absolute" w="100%" h="100%" overflow="hidden" zIndex={0}>
                {[...Array(10)].map((_, i) => (
                    <MotionBox
                        key={i}
                        position="absolute"
                        w="40px"
                        h="40px"
                        bg={`linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`}
                        opacity={0.1}
                        borderRadius="full"
                        animate={{
                            x: [0, 100, 0],
                            y: [0, 50, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        left={`${Math.random() * 100}%`}
                        top={`${Math.random() * 100}%`}
                    />
                ))}
            </Box>

            <Container maxW="container.xl" py={10} position="relative" zIndex={1}>
                <VStack spacing={12}>
                    {/* hero section */}
                    <MotionBox
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        textAlign="center"
                        pt={8}
                    >
                        <Heading 
                            size="3xl" 
                            mb={4}
                            bgGradient={`linear(to-r, ${primaryColor}, ${secondaryColor})`}
                            bgClip="text"
                        >
                            Simply Crochet 🧶
                        </Heading>
                        <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto" mb={8}>
                            Discover beautiful handmade crochet items crafted with passion and care. 
                            Join our community of yarn enthusiasts!
                        </Text>
                        
                        <HStack spacing={4} justify="center">
                            <MotionButton
                                size="lg"
                                colorScheme="pink"
                                rightIcon={<FaArrowRight />}
                                onClick={() => navigate('/shop')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Browse Collection
                            </MotionButton>
                            <MotionButton
                                size="lg"
                                variant="outline"
                                colorScheme="purple"
                                onClick={() => navigate('/auth')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Join Community
                            </MotionButton>
                        </HStack>
                    </MotionBox>

                    {/*grid for features*/}
                    <Grid 
                        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} 
                        gap={6} 
                        w="full"
                    >
                        {features.map((feature, index) => (
                            <MotionBox
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card 
                                    h="full" 
                                    bg={useColorModeValue("white", "gray.800")}
                                    border="1px solid"
                                    borderColor={useColorModeValue("gray.200", "gray.600")}
                                    _hover={{ 
                                        transform: 'translateY(-5px)',
                                        boxShadow: 'xl',
                                        borderColor: primaryColor
                                    }}
                                    transition="all 0.3s"
                                >
                                    <CardBody>
                                        <VStack spacing={4} align="center" textAlign="center">
                                            <MotionBox
                                                p={3} 
                                                borderRadius="full" 
                                                bg={`linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`}
                                                animate={{
                                                    y: [0, -10, 0],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                    delay: index * 0.2
                                                }}
                                            >
                                                <Icon as={feature.icon} boxSize={6} color="white" />
                                            </MotionBox>
                                            <Heading size="md">{feature.title}</Heading>
                                            <Text color="gray.600" fontSize="sm">
                                                {feature.description}
                                            </Text>
                                        </VStack>
                                    </CardBody>
                                </Card>
                            </MotionBox>
                        ))}
                    </Grid>

                    {/*slideshow*/}
                    <Box w="full" py={8}>
                        <VStack spacing={6}>
                            <Heading size="lg" textAlign="center">
                                Featured Creations
                            </Heading>
                            
                            {/*slideshow*/}
                            <Box position="relative" w="full" maxW="4xl" mx="auto">
                                <AspectRatio ratio={16/9}>
                                    <Box 
                                        borderRadius="xl" 
                                        overflow="hidden" 
                                        boxShadow="2xl"
                                        position="relative"
                                    >
                                        {crochetItems.map((item, index) => (
                                            <MotionBox
                                                key={item.id}
                                                position="absolute"
                                                w="full"
                                                h="full"
                                                initial={{ opacity: 0 }}
                                                animate={{ 
                                                    opacity: currentSlide === index ? 1 : 0,
                                                    scale: currentSlide === index ? 1 : 1.1
                                                }}
                                                transition={{ duration: 0.8 }}
                                            >
                                                <Image 
                                                    src={item.image} 
                                                    alt={item.name}
                                                    w="full"
                                                    h="full"
                                                    objectFit="cover"
                                                    loading="lazy"
                                                />
                                                <Box 
                                                    position="absolute"
                                                    bottom={0}
                                                    left={0}
                                                    right={0}
                                                    bg="linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
                                                    p={6}
                                                    color="white"
                                                >
                                                    <Flex justify="space-between" align="center">
                                                        <VStack align="start" spacing={2}>
                                                            <Badge colorScheme="pink">{item.category}</Badge>
                                                            <Heading size="lg">{item.name}</Heading>
                                                            <Text>{item.description}</Text>
                                                        </VStack>
                                                        <MotionButton
                                                            rightIcon={<FaArrowRight />}
                                                            colorScheme="pink"
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => navigate('/shop')}
                                                        >
                                                            View Details
                                                        </MotionButton>
                                                    </Flex>
                                                </Box>
                                            </MotionBox>
                                        ))}
                                    </Box>
                                </AspectRatio>

                                {/*indicators*/}
                                <HStack spacing={2} justify="center" mt={4}>
                                    {crochetItems.map((_, index) => (
                                        <Button
                                            key={index}
                                            size="xs"
                                            onClick={() => setCurrentSlide(index)}
                                            bg={currentSlide === index ? primaryColor : "gray.300"}
                                            _hover={{ bg: currentSlide === index ? primaryColor : "gray.400" }}
                                            transition="all 0.3s"
                                            borderRadius="full"
                                            w="12px"
                                            h="12px"
                                            p={0}
                                            minW="unset"
                                        />
                                    ))}
                                </HStack>
                            </Box>
                        </VStack>
                    </Box>

                    {/* Call to Action */}
                    <MotionBox
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        textAlign="center"
                        py={8}
                    >
                        <Card 
                            bg={`linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`}
                            color="white"
                            boxShadow="2xl"
                        >
                            <CardBody>
                                <VStack spacing={6}>
                                    <Heading size="lg">
                                        Ready to Start Your Crochet Journey?
                                    </Heading>
                                    <Text fontSize="lg">
                                        Browse our collection or join our community to unlock exclusive features
                                    </Text>
                                    <HStack spacing={4}>
                                        <MotionButton
                                            size="lg"
                                            colorScheme="white"
                                            variant="outline"
                                            rightIcon={<FaArrowRight />}
                                            onClick={() => navigate('/shop')}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Shop Now
                                        </MotionButton>
                                        <MotionButton
                                            size="lg"
                                            bg="white"
                                            color={primaryColor}
                                            onClick={() => navigate('/auth')}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Join Community
                                        </MotionButton>
                                    </HStack>
                                </VStack>
                            </CardBody>
                        </Card>
                    </MotionBox>
                </VStack>
            </Container>
        </Box>
    );
};

export default LandingPage;