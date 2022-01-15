import { SimpleGrid, useColorMode, Text } from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext'


const ArtistDashboard: FC = () => {
    const { currentUser } = useAuth()
    const [artistAlbum, setArtistAlbum] = useState<{
        _id: string | number,
        name: string,
        artist_name: string,
        genre: string,
        year: number,
        songs: string[]

    }[] | null>(null)
    const { colorMode } = useColorMode()
    const navigate = useNavigate()

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
            <Text>Welcome {artist}</Text>


            {artistAlbum?.map((e) => (
                <SimpleGrid
                    columns={{ sm: 2, md: 6 }}
                    spacing='8'
                    p='10'
                    textAlign='center'
                    rounded='lg'
                    color={colorMode === 'light' ? 'black' : 'gray.400'}
                    boxShadow='dark-lg'
                    key={e._id}
                    onClick={() => {
                        navigate(`/album-details/${e._id}`)
                    }}

                >
                    <Text >Album Name : {e.name}</Text>
                    <Text>Artist Name : {e.artist_name}</Text>
                    <Text>Artist Name : {e.artist_name}</Text>
                    <Text>Genre: {e.genre}</Text>
                    <Text>Year: {e.year}</Text>
                    <Text>Number of songs: {e.songs.length}</Text>

                </SimpleGrid >
            ))}


        </>
    )
}

export { ArtistDashboard }
