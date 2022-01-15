import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom'


import { Artist } from '../Artist/Artist'
import { Guest } from '../Guest/Guest'
import { Navbar } from '../Navbar/Navbar'
import { AlbumDetails } from '../AlbumDetails/AlbumDetails'
import { ArtistDashboard } from '../Artist/ArtistDashboard'
import { Login } from '../Login/Login'
import { Text } from '@chakra-ui/react'
import { UpdateProfile } from '../UpdateProfile/UpdateProfile'



const Router: FC = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Guest />} />
                <Route path="/artist" element={<Artist />} />
                <Route path="/album-details/:id" element={<AlbumDetails />} />
                <Route path="/dashboard" element={<ArtistDashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/update-profile" element={<UpdateProfile />} />
                <Route path='*' element={
                    <>
                        <Text>Not Found</Text>
                    </>
                } />
            </Routes>
        </>
    )
}

export { Router }
