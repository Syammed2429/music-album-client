import React, { FC, useEffect } from 'react'

import { useAuth } from '../../contexts/AuthContext'


const ArtistDashboard: FC = () => {
    const { currentUser } = useAuth()
    const artistName: string = currentUser.email.split('@')[0];
    console.log('artistName:', artistName)

    // useEffect(() => {

    // });

    return (
        <>
            <h1>dashboard</h1>

        </>
    )
}

export { ArtistDashboard }
