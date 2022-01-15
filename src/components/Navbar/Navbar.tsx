import React, { FC } from 'react';
import { Box, Button, Flex, Text, useColorMode } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'

const Navbar: FC = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <>
            <Box
                fontSize='3xl'
                py={5}
            >
                <Flex
                    justify='center'
                    gap='12%'
                >


                    <Text >
                        <Link to='/'>
                            Guest
                        </Link>
                    </Text>

                    <Text
                    >
                        <Link to='/artist'>
                            Artist Login
                        </Link>
                    </Text>
                    {/* <Spacer /> */}
                    <Box
                        position='absolute'
                        right='10'

                    >
                        <Button
                            onClick={toggleColorMode}>
                            {colorMode === 'light' ? <BsMoonFill /> : <BsSunFill />}
                        </Button>
                    </Box>
                </Flex>
            </Box>

        </>
    )
}

export { Navbar }
