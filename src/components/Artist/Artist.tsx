import { Box } from '@chakra-ui/react';
import React from 'react';
import { Navigate, } from 'react-router-dom'


import { useAuth } from '../../contexts/AuthContext'
import { ArtistDashboard } from './ArtistDashboard';



const Artist: any = () => {
    const { currentUser } = useAuth()


    return !currentUser ? <Navigate to="/login" /> : (
        <>
            <Box py={20}>
                <ArtistDashboard />
            </Box>
        </>
    )
}

export { Artist }
