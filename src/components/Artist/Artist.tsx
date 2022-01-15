import React from 'react';
import { Navigate, } from 'react-router-dom'


import { useAuth } from '../../contexts/AuthContext'
import { ArtistDashboard } from './ArtistDashboard';



const Artist: any = () => {
    const { currentUser } = useAuth()
    console.log('currentUser:', !currentUser)


    return !currentUser ? <Navigate to="/login" /> : (
        <>
            <ArtistDashboard />
        </>
    )
}

export { Artist }
