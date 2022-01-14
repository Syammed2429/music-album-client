import React, { FC } from 'react'
import { FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react'

const Search: FC = () => {
    return (
        <>
            <FormControl>
                <FormLabel htmlFor='email'>Search your favorite albums</FormLabel>
                <Input id='email' type='email' />
                <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
        </>
    )
}

export { Search }
