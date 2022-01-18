import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    Image,
    Select,
    SimpleGrid,
    Spinner,
    Text,
    useColorMode,
} from '@chakra-ui/react';
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
        album_image: string
    }[] | null>(null)

    const [allAlbumsData, setAllAlbumsData] = useState<{
        _id: string | number,
        name: string,
        artist_name: string,
        genre: string,
        year: number,
        songs: string[],
        album_image: string
    }[] | null>(null)
    const [pages, setPages] = useState(0)
    const [genre, setGenre] = useState<string | null>(null)
    const [year, setYear] = useState<number | null>(null)


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

        const getAllAlbumsData = async () => {
            const response = await fetch(`${BE}albums/allalbums`);
            const results = await response.json();
            setAllAlbumsData(results)

        }
        getAllAlbumsData()

        getData()
    }, [BE, page, pages]);


    for (let i = 1; i <= pages; i++) {
        arr.push(i)
    }

    const sortByYear = (val: string) => {
        const num: number = +val
        setYear(num)
        if (!val) return

        if (genre) {
            const data: any = allAlbumsData?.filter(e => e.year === num && e.genre === genre)
            setAlbums(data)

        } else {
            const data: any = allAlbumsData?.filter(e => e.year === num)
            setAlbums(data)

        }


    }

    const sortByGenre = (val: string) => {
        if (!val) return
        setGenre(val)

        if (year) {
            const data: any = allAlbumsData?.filter(e => e.year === year && e.genre === val)
            setAlbums(data)

        } else {
            const data: any = allAlbumsData?.filter(e => e.genre === val)
            setAlbums(data)

        }

    }


    return (


        <>

            <Container>

                <Select placeholder='Sort By Date'
                    onChange={(e: any) => sortByYear(e.target.value)}

                >
                    <option value='2019'>2019</option>
                    <option value='2020'>2020</option>
                    <option value='2022'>2022</option>
                </Select>



                <Select placeholder='Sort By Genre'
                    onChange={(e: any) => sortByGenre(e.target.value)}

                >
                    <option value='pop'>Pop</option>
                    <option value='Rock'>Rock</option>
                    <option value='Jazz'>Jazz</option>
                </Select>
            </Container>

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

                    <Box
                        margin='auto'

                    >
                        <SimpleGrid
                            columns={{ sm: 2, md: 3, lg: 5 }}
                            spacing='8'

                        >
                            {albums === null ? (
                                <Text>No data</Text>
                            ) : null}
                            {albums?.map((e) => (
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
                        </SimpleGrid>
                    </Box>
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
                    onClick={() => {
                        setPage(prev => prev - 1)

                    }}
                    disabled={page === 1}
                >
                    Prev
                </Button>

                {arr.map((e) => (
                    <Box key={e}>
                        <Button
                            onClick={() => {
                                setPage(e)
                                // navigate(`${page}`)

                            }}

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

