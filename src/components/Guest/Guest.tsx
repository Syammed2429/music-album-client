import { Box, Button, Center, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react'




const Guest: FC = () => {

    const [page, setPage] = useState<number>(1);
    const [albums, setAlbums] = useState<{
        _id: string | number,
        name: string,
        artist_name: string,
        genre: string,
        year: number,
        songs: string[],
    }[] | null>(null)

    const BE: string | undefined = process.env.REACT_APP_BACKEND

    //Fetch the music album from the backend
    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`${BE}albums?page=${page}`);
            const results = await response.json();
            setAlbums(results.albums)

        }

        getData()
    }, [BE, page]);


    //Get the a particular albums
    const getById = async (e: string | number) => {
        console.log('string:', e)
        const response = await fetch(`${BE}albums/${e}`)
        const results = await response.json();
        console.log('results:', results)


    }


    return (
        <>
            <Center py={10}>
                <Box
                    rounded='md'

                >
                    {albums?.map((e) => (
                        <SimpleGrid
                            columns={{ sm: 2, md: 6 }}
                            spacing='8'
                            p='10'
                            textAlign='center'
                            rounded='lg'
                            color='gray.400'
                            boxShadow='dark-lg'
                            key={e._id}
                            onClick={() => {
                                getById(e._id)
                            }}
                        >
                            <Text >Album Name : {e.name}</Text>
                            <Text>Artist Name : {e.artist_name}</Text>
                            <Text>Artist Name : {e.artist_name}</Text>
                            <Text>Genre: {e.genre}</Text>
                            <Text>Year: {e.year}</Text>
                            <Text>Number of songs: {e.songs.length}</Text>

                        </SimpleGrid >
                    ))}
                </Box>
            </Center>
            <Flex
                justify="space-around"

            >

                <Button
                    onClick={() => setPage(prev => prev - 1)}
                    disabled={page === 1}
                >
                    Prev
                </Button>
                <Button
                    disabled={albums?.length === 0}
                    onClick={() => setPage(prev => prev + 1)}>
                    Next
                </Button>
            </Flex>

        </>
    )
}

export { Guest }

