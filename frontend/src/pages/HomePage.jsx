import React, { useEffect } from 'react'
import {Container, VStack, Text, SimpleGrid, Spinner, Center} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useItemStore } from '../shop/item'
import ItemCard from '../components/ItemCard'
import { useUserStore } from '../users/user'

const HomePage = () => {
    const {fetchItems, items, loading} = useItemStore();
    const { isAuthenticated, isAdmin } = useUserStore();

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    return (
        <Container maxW='container.xl' py={12}>
            <VStack spacing={8}>
                <Text
                    fontSize={"30"}
                    fontWeight={"bold"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                    textAlign={"center"}
                >
                    {isAuthenticated ? `Welcome to Simply Crochet! 🧶` : 'Available Items 🪡'}
                </Text>
                
                {loading ? (
                    <Center py={10}>
                        <Spinner size="xl" />
                    </Center>
                ) : (
                    <>
                        <SimpleGrid
                            columns={{
                                base: 1,
                                md: 2,
                                lg: 3
                            }}
                            spacing={10}
                            w={"full"}
                        >
                            {items.map((item) => (
                                <ItemCard 
                                    key={item._id} 
                                    item={item}
                                    showActions={isAuthenticated && isAdmin()}
                                />
                            ))}
                        </SimpleGrid>
                        
                        {items.length === 0 && (
                            <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
                                No items found 😔 {" "} 
                                {isAdmin() && (
                                    <Link to={"/create"}>
                                        <Text as='span' color='blue.500' _hover={{textDecoration: "underline"}}>
                                            Create an item 
                                        </Text>
                                    </Link>
                                )}
                            </Text>
                        )}
                    </>
                )}
            </VStack>
        </Container>
    )  
}

export default HomePage