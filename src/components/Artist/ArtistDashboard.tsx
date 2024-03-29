import { SimpleGrid, Image, useColorMode, Text, Center, Box, Flex, Spinner, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { FiChevronDown, FiLogOut } from 'react-icons/fi'
import { RiUserSettingsLine } from 'react-icons/ri'



import { useAuth } from '../../contexts/AuthContext'


const ArtistDashboard: any = () => {
    const { currentUser, logout } = useAuth()
    const [artistAlbum, setArtistAlbum] = useState<{
        _id: string | number,
        name: string,
        artist_name: string,
        genre: string,
        year: number,
        album_image: string,
        songs: string[]

    }[] | null>(null)
    const [error, setError] = useState<string | null>(null)

    const { colorMode } = useColorMode()
    const navigate = useNavigate()

    const BE: string | undefined = process.env.REACT_APP_BACKEND


    //Taking the current user and splitting it to fetch the artist album
    const artistName: string = currentUser.email.split('@')[0];
    const spliceArtistName: string = artistName.split('').splice(1).join('')
    const artist: string = artistName.split('')[0].toUpperCase() + spliceArtistName


    useEffect(() => {

        //Fetching the artist music album
        const getArtistData = async () => {
            const response = await fetch(`${BE}albums/artist?name=${artist}`)
            const results = await response.json();
            setArtistAlbum(results)

        }
        getArtistData()

    }, [BE, artist, artistName]);



    //Logout func
    const handleLogOut = async () => {
        setError(null)
        try {
            await logout()
            window.location.href = 'https://music-album-iota.vercel.app/login';

        } catch {
            setError('Failed to log out')
        }
    }


    return !currentUser ? <Navigate to="/login" /> : (
        <>

            <Flex
                justify='flex-end'
                mr={10}
            >

                <Menu>
                    {({ isOpen }) => (
                        <>
                            <MenuButton
                                px={4}
                                py={2}
                                transition='all 0.2s'
                                borderRadius='md'
                                borderWidth='1px'
                                _hover={{ bg: 'gray.400' }}
                                _expanded={{ bg: 'red.400' }}
                                _focus={{ boxShadow: 'outline' }}
                                isActive={isOpen} as={Button} rightIcon={<FiChevronDown />}>
                                {isOpen ? 'Close' : 'Menu'}
                            </MenuButton>
                            <MenuList>
                                <MenuItem
                                    onClick={() => {
                                        navigate('/update-profile')
                                    }}>
                                    Update Profile
                                    <RiUserSettingsLine style={{ marginLeft: "10px" }} />
                                </MenuItem>
                                <MenuItem
                                    _hover={{ bg: 'red.400' }}

                                    onClick={handleLogOut}>
                                    Log out
                                    <FiLogOut style={{ marginLeft: "10px" }} />
                                </MenuItem>
                            </MenuList>
                        </>
                    )}
                </Menu>

            </Flex>
            {error}

            <Text
                color="#81E6D9"
                fontSize='2xl'
            >
                Welcome {artist}
            </Text>

            <Center py={10}>
                <Box
                    rounded='md'

                >
                    {artistAlbum === null ? (
                        <Flex
                            justify='center'
                            alignItems='center'
                        >
                            <Spinner />
                        </Flex>) : null}

                    <Center
                        margin='auto'

                    >
                        <Flex
                            flexDirection={{ base: 'column', sm: 'row' }}
                            gap={5}
                            // justify={{ sm: 'center' }}
                            // columns={{ sm: 2, md: 2, lg: 5 }}
                            spacing='8'

                        >
                            {artistAlbum === null ? (
                                <Text>No data</Text>
                            ) : null}
                            {artistAlbum?.map((e) => (
                                <SimpleGrid
                                    spacing='3'
                                    p='10'
                                    textAlign='center'
                                    rounded='lg'
                                    color={colorMode === 'light' ? 'black' : 'gray.400'}
                                    boxShadow='dark-lg'
                                    key={e._id}
                                    _hover={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        navigate(`/album-details/${e._id}`)
                                    }}
                                >
                                    <Center>

                                        <Image
                                            boxSize='150px'
                                            objectFit='cover'
                                            src={e.album_image} />
                                    </Center>
                                    <Text >Album Name : {e.name}</Text>
                                    <Text>Artist Name : {e.artist_name}</Text>
                                    <Text>Genre: {e.genre}</Text>
                                    <Text>Year: {e.year}</Text>
                                    <Text>Number of songs: {e.songs.length}</Text>

                                </SimpleGrid >
                            ))}
                        </Flex>
                    </Center>
                </Box>
            </Center>


        </>
    )
}

export { ArtistDashboard }
