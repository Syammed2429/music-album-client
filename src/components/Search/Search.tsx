import React, { FC } from 'react'
import { Button, Container, Flex, FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import { AiOutlineSearch } from 'react-icons/ai'


const Search: FC = () => {



    return (
        <>
            <Container my={5}>

                <FormControl>
                    <FormLabel htmlFor='search'>Search your favorite albums</FormLabel>
                    <Flex gap={2}>
                        <Input
                            id='search'
                            type='search'
                            placeholder="Search your albums..." />
                        <Button>
                            <AiOutlineSearch />
                        </Button>
                    </Flex>
                    <FormHelperText>Search your favorite albums.</FormHelperText>
                </FormControl>
            </Container>
        </>
    )
}

export { Search }
