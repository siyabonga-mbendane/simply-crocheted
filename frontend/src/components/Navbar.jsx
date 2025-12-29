import { 
    Button, 
    Container, 
    Flex, 
    HStack, 
    Text, 
    useColorMode,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Avatar,
    Box
} from '@chakra-ui/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {PlusSquareIcon} from '@chakra-ui/icons'
import {IoMoon} from 'react-icons/io5'
import {LuSun} from 'react-icons/lu'
import { useUserStore } from '../users/user'
import { ChevronDownIcon } from '@chakra-ui/icons'

export const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    const { user, isAuthenticated, logout, isAdmin } = useUserStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Box borderBottom="1px" borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}>
            <Container maxW={"1140px"} px={4}>
                <Flex
                    h={16}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    flexDir={{
                        base:"column",
                        sm:"row"
                    }}
                >
                    <Text
                        fontSize={{base:"22", sm:"28"}}
                        fontWeight={"bold"}
                        textTransform={"uppercase"}
                        textAlign={"center"}
                        bgGradient={"linear(to-r, cyan.400, blue.500)"}
                        bgClip={"text"}
                        cursor="pointer"
                        onClick={() => navigate(isAuthenticated ? '/shop' : '/')}
                    >
                        Simply Crochet 🧶
                    </Text>
                    
                    <HStack spacing={4} alignItems={"center"}>
                        {isAuthenticated ? (
                            <>
                                {isAdmin() && (
                                    <Link to={"/create"}>
                                        <Button leftIcon={<PlusSquareIcon />} colorScheme="blue" size="sm">
                                            Add Item
                                        </Button>
                                    </Link>
                                )}
                                
                                <Menu>
                                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="ghost">
                                        <HStack spacing={2}>
                                            <Avatar size="sm" name={user?.username} />
                                            <Text>{user?.username}</Text>
                                        </HStack>
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem onClick={() => navigate('/shop')}>
                                            Browse Items
                                        </MenuItem>
                                        {isAdmin() && (
                                            <MenuItem onClick={() => navigate('/create')}>
                                                Manage Items
                                            </MenuItem>
                                        )}
                                        <MenuItem onClick={handleLogout} color="red.500">
                                            Logout
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Link to="/shop">
                                    <Button variant="ghost" size="sm">
                                        Browse Shop
                                    </Button>
                                </Link>
                                <Link to="/auth">
                                    <Button colorScheme="blue" size="sm">
                                        Login / Signup
                                    </Button>
                                </Link>
                            </>
                        )}
                        
                        <Button onClick={toggleColorMode} aria-label="Toggle color mode" variant="ghost">
                            {colorMode === "light" ? <IoMoon/> : <LuSun size="20"/>}
                        </Button>
                    </HStack>
                </Flex>
            </Container>
        </Box>
    )
}
