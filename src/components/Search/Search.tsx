import React, { FC, useState, ChangeEvent, useEffect } from 'react'
import { Box, Button, Container, Flex, FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import { AiOutlineSearch } from 'react-icons/ai'


const Search: FC = () => {
    const [query, setQuery] = useState<string | null>(null)
    const BE: string | undefined = process.env.REACT_APP_BACKEND


    // useEffect(() => {
    const searchAlbum = async (query: string | null) => {
        const response = await fetch(`${BE}albums/search?q=${query}`)
        const results = await response.json();
        console.log('results:', results)

    }
    // searchAlbum()
    // }, [BE, query])



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
                <Box>
                    Hello
                </Box>
            </Container>
        </>
    )
}

export { Search }
