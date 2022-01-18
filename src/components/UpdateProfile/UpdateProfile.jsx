import React, { useRef, useState } from "react"
import {
    FormControl,
    FormLabel,
    Container,
    Alert,
    Button,
    Input,
    AlertIcon,
    Box,


} from '@chakra-ui/react'

import { Link, useNavigate, } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

const UpdateProfile = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        const promises = []
        setLoading(true)
        setError("")

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises)
            .then(() => {
                navigate("/artist")
            })
            .catch(() => {
                setError("Failed to update account")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
            <Container>
                <Container>
                    <h2 className="text-center mb-4">Update Password</h2>
                    {error &&
                        <Alert status='error'>
                            <AlertIcon />
                            {error}
                        </Alert>
                    }
                    <form onSubmit={handleSubmit}>

                        <FormControl >
                            <FormControl id="email">
                                <FormControl>Email</FormControl>
                                <Input
                                    type="email"
                                    ref={emailRef}
                                    defaultValue={currentUser.email}
                                    placeholder="Enter the email address"
                                />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    ref={passwordRef}
                                    placeholder="Leave blank to keep the same"
                                />
                            </FormControl>
                            <FormControl id="password-confirm">
                                <FormLabel>Password Confirmation</FormLabel>
                                <Input
                                    type="password"
                                    ref={passwordConfirmRef}
                                    placeholder="Leave blank to keep the same"
                                />
                            </FormControl>
                            <Button disabled={loading} type="submit">
                                Update
                            </Button>
                        </FormControl>
                    </form>

                </Container>
            </Container>
            <Box my={2}>
                <Link to="/dashboard">Cancel</Link>
            </Box>
        </>
    )
}

export { UpdateProfile }