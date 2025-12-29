import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useItemStore } from '../shop/item';
import { useUserStore } from '../users/user';

const ItemCard = ({item, showActions = true}) => {
  const [updatedItem, setUpdatedItem] = useState(item);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const {deleteItem, updateItem} = useItemStore();
  const { isAdmin } = useUserStore();
  const toast = useToast();
  const {isOpen, onOpen, onClose} = useDisclosure()
  
  const handleDeleteItem = async (id) => {
    const {success, message} = await deleteItem(id);
    if(!success){
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }else{
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleUpdateItem = async (id, updatedItem) => {
    const {success, message} = await updateItem(id, updatedItem);
    onClose();
    if(!success){
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }else{
      toast({
        title: "Success",
        description: "Item updated successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    }
  }
  
  return (
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{transform: "translateY(-5px)", shadow: "xl"}}
      bg={bg}
    >
      <Image src={item.image} alt={item.name} h={48} w='full' objectFit='cover' />
      <Box p={4}>
        <Heading as='h3' size='md' mb={2}>
          {item.name}
        </Heading>
        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
          R{item.price}
        </Text>
        
        {showActions && isAdmin() && (
          <HStack spacing={2}>
            <IconButton 
              icon={<EditIcon/>} 
              onClick={onOpen}
              colorScheme='blue' 
              aria-label="Edit item"
            />
            <IconButton 
              icon={<DeleteIcon/>} 
              onClick={() => handleDeleteItem(item._id)} 
              colorScheme='red' 
              aria-label="Delete item"
            />
          </HStack>
        )}
      </Box>
      
      {/* update modal - admins access */}
      {isAdmin() && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
            <ModalContent>
              <ModalHeader>Update Item</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={4}>
                  <Input
                    placeholder="Item Name"
                    name="name"
                    value={updatedItem.name}
                    onChange={(e) => setUpdatedItem({...updatedItem, name: e.target.value})}
                  />
                  <Input
                    placeholder="Price"
                    name="price"
                    type="number"
                    value={updatedItem.price}
                    onChange={(e) => setUpdatedItem({...updatedItem, price: e.target.value})}
                  />
                  <Input
                    placeholder="Image URL"
                    name="image"
                    value={updatedItem.image}
                    onChange={(e) => setUpdatedItem({...updatedItem, image: e.target.value})}
                  />
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={() => handleUpdateItem(item._id, updatedItem)}>
                  Update
                </Button>
                <Button variant='ghost' onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
        </Modal>
      )}
    </Box>
  )
};

export default ItemCard;