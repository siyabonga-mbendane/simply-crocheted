import { Box, Button, Container, Heading, Input, useToast, useColorModeValue, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useItemStore } from '../shop/item';

const CreatePage = () => {

  const [newItem, setNewItem] = useState({
    name:"",
    price:"",
    image:""
  });
  // notification
  const toast = useToast();

  const {createItem} = useItemStore();

  const handleAddItem = async () =>{
    const {success, message} = await createItem(newItem);
    if(!success){
      toast({
        "title":"Error",
        description:message,
        status:"error",
        isClosable: true
      })
    }
    else{
      toast({
        "title":"Success",
        description:message,
        status:"success",
        isClosable: true
      })
    }
    setNewItem({name:"", price:"", image:";"});
  }
  return (
    <Container maxW={"container.sm"}>
      <VStack
        spacing={8}
      >
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mg={8}>
          Add New Item
        </Heading>
        <Box
          w={"full"} bg={useColorModeValue("white", "gray.800")}
          p={6} rounded={"lg"} shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder='Item Name'
              name='name'
              value={newItem.name}
              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
            />
            <Input
              placeholder='Price'
              name='price'
              type='number'
              value={newItem.price}
              onChange={(e) => setNewItem({...newItem, price: e.target.value})}
            />
            <Input
              placeholder='Image URL'
              name='image'
              value={newItem.image}
              onChange={(e) => setNewItem({...newItem, image: e.target.value})}
            />
            <Button colorScheme='blue' onClick={handleAddItem} w='full'>
              Add Item
            </Button>
          </VStack>

        </Box>

      </VStack>
    </Container>
  )
}

export default CreatePage