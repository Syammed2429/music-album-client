import { Center, Box, SimpleGrid, Text, Flex, Spinner } from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'



const AlbumDetails: FC = () => {

    const [album, setAlbum] = useState<string[] | any | null>(null)

    const { id } = useParams()

    const BE: string | undefined = process.env.REACT_APP_BACKEND


    useEffect(() => {
        //Get the a particular albums
        const getById = async () => {
            const response = await fetch(`${BE}albums/${id}`)
            const results = await response.json();
            setAlbum(results)
        }
        getById()
    }, [BE, id]);

    return (
        <>
            <Center py={10}>
                <Box
                    rounded='md'

                >
                    {/*SPinner */}
                    {album === null ? (
                        <Flex
                            justify='center'
                            alignItems='center'
                        >
                            <Spinner />
                        </Flex>) : null}

                    <SimpleGrid
                        rows={{ sm: 1, md: 1 }}
                        spacing='8'
                        p='10'
                        textAlign='center'
                        rounded='lg'
                        color='gray.400'
                        boxShadow='dark-lg'

                    >

                        <Text >Album Name : {album?.name}</Text>
                        <Text>Artist Name : {album?.artist_name}</Text>
                        <Text>Genre: {album?.genre}</Text>
                        <Text>Year: {album?.year}</Text>
                        <Box>Songs: {album?.songs.map((e: any) => (
                            <Flex
                                justify='center'
                                gap={3}
                                key={e._id}>
                                <Text>Song name : {e.name},</Text>
                                <Text>Song duration :{e.duration}</Text>
                            </Flex>
                        ))}</Box>

                    </SimpleGrid >
                </Box>
            </Center>

        </>
    )
}

export { AlbumDetails }

