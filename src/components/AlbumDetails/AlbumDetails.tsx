import { Center, Box, SimpleGrid, Text } from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'



const AlbumDetails: FC = () => {

    const [albums, setAlbums] = useState<string[] | any | null>(null)

    const { id } = useParams()

    const BE: string | undefined = process.env.REACT_APP_BACKEND


    useEffect(() => {
        //Get the a particular albums
        const getById = async () => {
            const response = await fetch(`${BE}albums/${id}`)
            const results = await response.json();
            setAlbums(results)
        }
        getById()
    }, [BE, id]);

    return (
        <>
            <Center py={10}>
                <Box
                    rounded='md'

                >
                    <SimpleGrid
                        rows={{ sm: 1, md: 1 }}
                        spacing='8'
                        p='10'
                        textAlign='center'
                        rounded='lg'
                        color='gray.400'
                        boxShadow='dark-lg'

                    >

                        <Text >Album Name : {albums?.name}</Text>
                        <Text>Artist Name : {albums?.artist_name}</Text>
                        <Text>Artist Name : {albums?.artist_name}</Text>
                        <Text>Genre: {albums?.genre}</Text>
                        <Text>Year: {albums?.year}</Text>
                        <Text>Number of songs: {albums?.songs.length}</Text>

                    </SimpleGrid >
                </Box>
            </Center>

        </>
    )
}

export { AlbumDetails }
