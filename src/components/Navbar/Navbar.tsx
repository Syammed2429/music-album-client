import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <Box>
                <Flex
                    justify='center'
                    gap={10}
                >
                    <Text>
                        <Link to='/'>
                            Guest
                        </Link>
                    </Text>

                    <Text>
                        <Link to='/artist'>
                            Artist Login
                        </Link>
                    </Text>
                </Flex>
            </Box>

        </>
    )
}

export { Navbar }
