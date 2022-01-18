import { Box, Button, Center, Flex, SimpleGrid, Spinner, Text, useColorMode } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


import { Search } from '../Search/Search';



const Guest: FC = () => {
    const { colorMode } = useColorMode()


    const [page, setPage] = useState<number>(1);
    const [albums, setAlbums] = useState<{
        _id: string | number,
        name: string,
        artist_name: string,
        genre: string,
        year: number,
        songs: string[],
    }[] | null>(null)
    const [pages, setPages] = useState(0)



    const BE: string | undefined = process.env.REACT_APP_BACKEND
    const navigate = useNavigate()

    let arr: number[] = []

    //Fetch the music album from the backend
    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`${BE}albums?page=${page}`);
            const results = await response.json();
            setAlbums(results.albums)
            setPages(results.totalPages)

        }


        getData()
    }, [BE, page, pages]);


    for (let i = 1; i <= pages; i++) {
        // console.log("i", i);
        arr.push(i)


    }



    return (


        <>
            <Center py={10}>
                <Box
                    rounded='md'

                >
                    {albums === null ? (
                        <Flex
                            justify='center'
                            alignItems='center'
                        >
                            <Spinner />
                        </Flex>) : null}

                    <Search />

                    {albums?.map((e) => (
                        <SimpleGrid
                            columns={{ sm: 2, md: 5 }}
                            spacing='8'
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
                            <Text >Album Name : {e.name}</Text>
                            <Text>Artist Name : {e.artist_name}</Text>
                            <Text>Genre: {e.genre}</Text>
                            <Text>Year: {e.year}</Text>
                            <Text>Number of songs: {e.songs.length}</Text>

                        </SimpleGrid >
                    ))}
                </Box>
            </Center>
            <Flex
                justify="center"
                my={5}
                gap={2}
                alignItems="center"


            >
                <Text>Total Pages : {pages}</Text>
                <Button
                    onClick={() => setPage(prev => prev - 1)}
                    disabled={page === 1}
                >
                    Prev
                </Button>

                {arr.map((e) => (
                    <Box key={e}>
                        <Button
                            onClick={() => {
                                setPage(e)
                            }}
                        // disabled={prev = prev}

                        >{e}</Button>
                    </Box>
                ))}

                <Button
                    disabled={page === arr.length}
                    onClick={() => setPage(prev => prev + 1)}>
                    Next
                </Button>

            </Flex>

        </>
    )
}

export { Guest }

