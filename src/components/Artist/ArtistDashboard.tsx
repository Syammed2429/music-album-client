import React, { FC, useEffect, useState } from 'react'

import { useAuth } from '../../contexts/AuthContext'


const ArtistDashboard: FC = () => {
    const { currentUser } = useAuth()
    const [artistAlbum, setArtistAlbum] = useState<string[] | null>(null)

    const BE: string | undefined = process.env.REACT_APP_BACKEND

    //Taking the current user and splitting it to fetch the artist album
    const artistName: string = currentUser.email.split('@')[0];
    const spliceArtistName: string = artistName.split('').splice(1).join('')
    const artist: string = artistName.split('')[0].toUpperCase() + spliceArtistName


    useEffect(() => {

        //Fetching the artist music album
        const getArtistData = async () => {
            const response = await fetch(`${BE}albums/artist?name=${artist}`)
            const results = await response.json();
            setArtistAlbum(results)

        }
        getArtistData()

    }, [BE, artist, artistName]);

    return (
        <>
            <h1>dashboard</h1>

        </>
    )
}

export { ArtistDashboard }
