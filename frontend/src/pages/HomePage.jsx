import React, { useEffect } from 'react'
import {Container, VStack, Text, SimpleGrid} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useItemStore } from '../shop/item'
import ItemCard from '../components/ItemCard.jsx'

const HomePage = () => {

  const {fetchItems, items} = useItemStore();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);
  console.log("items", items);
  return (
    <Container maxW='container.x1' py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Available Items 🪡
        </Text>
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
            <ItemCard key={item._id} item={item}/>
          ))}
        </SimpleGrid>
        <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
          No items found 😔 {" "} 
          <Link to={"/create"}>
            <Text as='span' color='blue.500' _hover={{textDecoration: "underline"}}>
              Create an item 
            </Text>
          </Link> 
        </Text> 
      </VStack>
    </Container>
  )  
}

export default HomePage