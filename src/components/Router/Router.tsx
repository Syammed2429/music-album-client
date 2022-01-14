import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom'


import { Artist } from '../Artist/Artist'
import { Guest } from '../Guest/Guest'
import { Navbar } from '../Navbar/Navbar'

const Router: FC = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Guest />} />
                <Route path="/artist" element={<Artist />} />
            </Routes>
        </>
    )
}

export { Router }
