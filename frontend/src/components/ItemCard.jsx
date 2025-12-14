import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Heading, HStack, IconButton, Image, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const ItemCard = ({item}) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
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
        <HStack spacing={2}>
          <IconButton icon={<EditIcon/>} colorScheme='blue' />
          <IconButton icon={<DeleteIcon/>} colorScheme='red' />
        </HStack>
      </Box>
    </Box>
  )
}

export default ItemCard