import { Box, Center, SimpleGrid, Text } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react'




const Guest: FC = () => {

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
            const response = await fetch(`${BE}albums`);
            const results = await response.json();
            // console.log('results:', results.albums[2].songs.length)
            setAlbums(results.albums)

        }

        getData()
    }, [BE]);

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

        </>
    )
}

export { Guest }
