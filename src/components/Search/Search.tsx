import React, { FC, useState, ChangeEvent } from 'react'
import { Box, Button, Container, Flex, FormControl, Text, FormHelperText, FormLabel, Input, SimpleGrid, useColorMode, Spinner } from '@chakra-ui/react'
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';


const Search: FC = () => {
    const [query, setQuery] = useState<string | null>(null)
    const [albumData, setAlbumData] = useState<{
        _id: string | number,
        name: string,
        artist_name: string,
        genre: string,
        songs: string[],
        year: number,
    }[] | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const BE: string | undefined = process.env.REACT_APP_BACKEND;
    const navigate = useNavigate();
    const { colorMode } = useColorMode();


    const searchAlbum = async (query: string | null) => {
        setLoading(true)
        const response = await fetch(`${BE}albums/search?q=${query}`)
        const results = await response.json();
        setAlbumData(results)
        setLoading(false)


    }


    return (

        <>
            <Container my={5}>

                <FormControl>
                    <FormLabel htmlFor='search'>Search your favorite albums</FormLabel>
                    <Flex gap={2}>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                            id='search'
                            type='search'
                            placeholder="Search your albums..." />

                        <Button
                            onClick={() => {
                                searchAlbum(query)
                            }}
                        >
                            <AiOutlineSearch />
                        </Button>
                    </Flex>
                    <FormHelperText>Search your favorite albums.</FormHelperText>
                </FormControl>
                <Box
                    boxShadow='dark-lg'

                >
                    {loading && (
                        <Flex
                            justify='center'
                            alignItems='center'
                        >
                            <Spinner />
                        </Flex>)}

                    {albumData?.map((e) => (
                        <SimpleGrid
                            columns={{ sm: 2, md: 5 }}
                            spacing='8'
                            p='10'
                            textAlign='center'
                            rounded='lg'
                            color={colorMode === 'light' ? 'black' : 'gray.400'}
                            key={e._id}
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
            </Container>
        </>
    )
}

export { Search }
